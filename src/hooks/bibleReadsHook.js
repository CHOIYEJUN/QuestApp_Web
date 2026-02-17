import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  getDoc,
  deleteField,
} from "firebase/firestore";
import { auth, DBservice } from "../fireBase";
import { getToday } from "../util/DateUtil";

const COLLECTION = "bibleReads";
const userID = () => localStorage.getItem("user_uid") || auth.currentUser?.uid;

/** YYYY-MM-DD 형식인지 확인 */
const isDateString = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);

/**
 * 사용자가 읽은 성경 장 목록 조회 (key: "책이름-장", value: "YYYY-MM-DD" 읽은 날짜 또는 legacy true)
 * @returns {Promise<Record<string, string|boolean>>} chapters map
 */
export const getBibleReads = async () => {
  const uid = userID();
  if (!uid) return {};
  try {
    const ref = doc(DBservice, COLLECTION, uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return {};
    return snap.data().chapters || {};
  } catch (e) {
    console.error(e);
    return {};
  }
};

/**
 * chapters 객체에서 "그날 하나라도 읽은" 날짜만 추출 (달력용)
 * @param {Record<string, string|boolean>} chapters - getBibleReads() 결과
 * @returns {string[]} 유니크한 날짜 배열 ["2026-02-16", ...]
 */
export const getBibleReadDatesFromChapters = (chapters) => {
  if (!chapters || typeof chapters !== "object") return [];
  const dates = Object.values(chapters).filter(isDateString);
  return [...new Set(dates)];
};

/**
 * 현재 로그인 유저의 "성경 읽은 날" 목록 (달력에 표시할 날짜들)
 * @returns {Promise<string[]>}
 */
export const getBibleReadDates = async () => {
  const chapters = await getBibleReads();
  return getBibleReadDatesFromChapters(chapters);
};

/**
 * 한 장 읽음 토글: 읽음이면 삭제, 아니면 오늘 날짜로 추가
 * @returns {Promise<"success"|"fail">}
 */
export const toggleBibleChapter = async (book, chapter) => {
  const uid = userID();
  if (!uid) return "fail";
  const key = `${book}-${chapter}`;
  try {
    const ref = doc(DBservice, COLLECTION, uid);
    const snap = await getDoc(ref);
    const current = (snap.exists() && snap.data().chapters) || {};
    const isRead = !!current[key];
    if (isRead) {
      await updateDoc(ref, { [`chapters.${key}`]: deleteField() });
    } else {
      const readAt = getToday();
      await setDoc(ref, { chapters: { ...current, [key]: readAt } }, { merge: true });
    }
    return "success";
  } catch (e) {
    console.error(e);
    return "fail";
  }
};

/**
 * stemp 테이블 전체를 임시 JSON으로 불러오기 (백업/이관용)
 * @returns {Promise<{ raw: Array<{id: string, uid: string, user_name?: string, quest_date: string, quest_status?: string}> }>}
 */
export const fetchStempAsJson = async () => {
  const snapshot = await getDocs(collection(DBservice, "stemp"));
  const raw = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
  return { raw };
};

/**
 * stemp JSON + bibleSchedule 비교해서 유저별 "장 → 읽은 날짜" 맵 + user_name 수집
 * @param {Array<{uid: string, user_name?: string, quest_date: string}>} stempRaw
 * @param {Record<string, Array<{book: string, chapter: string}>>} bibleDate
 * @returns {{ chaptersByUser: Record<string, Record<string, string>>, userNames: Record<string, string> }}
 */
export const stempJsonToChaptersByUser = (stempRaw, bibleDate) => {
  const chaptersByUser = {};
  const userNames = {};
  stempRaw.forEach((row) => {
    const uid = row.uid;
    const questDate = row.quest_date;
    if (!uid || !questDate) return;
    if (row.user_name) userNames[uid] = row.user_name;
    const entries = bibleDate[questDate];
    if (!Array.isArray(entries)) return;
    if (!chaptersByUser[uid]) chaptersByUser[uid] = {};
    entries.forEach(({ book, chapter }) => {
      const key = `${book}-${chapter}`;
      chaptersByUser[uid][key] = questDate;
    });
  });
  return { chaptersByUser, userNames };
};

/**
 * stemp 테이블 불러와서 임시 JSON으로 만든 뒤, bibleSchedule이랑 비교해서
 * 각 유저별 이미 읽은 성경 구절 + 읽은 날짜를 bibleReads 컬렉션으로 이관 (1회 실행용)
 * @param {Record<string, Array<{book: string, chapter: string}>>} bibleDate - bibleSchedule.bibleDate
 * @returns {Promise<{ success: boolean, message: string, stempJson?: object }>}
 */
export const runBibleReadsMigration = async (bibleDate) => {
  try {
    const { raw: stempJson } = await fetchStempAsJson();
    const { chaptersByUser, userNames } = stempJsonToChaptersByUser(stempJson, bibleDate);

    for (const [uid, chapters] of Object.entries(chaptersByUser)) {
      const ref = doc(DBservice, COLLECTION, uid);
      await setDoc(
        ref,
        { uid, user_name: userNames[uid] || null, chapters },
        { merge: true }
      );
    }

    return {
      success: true,
      message: `이관 완료: ${Object.keys(chaptersByUser).length}명 (stemp ${stempJson.length}건 → bibleReads, 날짜 포함)`,
      stempJson,
    };
  } catch (e) {
    console.error(e);
    return { success: false, message: (e && e.message) || "이관 실패" };
  }
};

/**
 * 특정 날짜에 읽은 기록만 삭제 (달력에서 "이 날짜 기록 삭제" 시 사용)
 * @param {string} dateStr - "YYYY-MM-DD"
 * @returns {Promise<"success"|"fail">}
 */
export const deleteBibleReadsByDate = async (dateStr) => {
  const uid = userID();
  if (!uid || !isDateString(dateStr)) return "fail";
  try {
    const ref = doc(DBservice, COLLECTION, uid);
    const snap = await getDoc(ref);
    const chapters = (snap.exists() && snap.data().chapters) || {};
    const updates = {};
    Object.entries(chapters).forEach(([key, value]) => {
      if (value === dateStr) updates[`chapters.${key}`] = deleteField();
    });
    if (Object.keys(updates).length === 0) return "success";
    await updateDoc(ref, updates);
    return "success";
  } catch (e) {
    console.error(e);
    return "fail";
  }
};

/**
 * 통계용: 전체 유저의 bibleReads 조회 (날짜별로 몇 명이 읽었는지 계산할 때 사용)
 * @returns {Promise<Array<{ uid: string, chapters: Record<string, string|boolean> }>>}
 */
export const getAllBibleReads = async () => {
  try {
    const snapshot = await getDocs(collection(DBservice, COLLECTION));
    return snapshot.docs.map((d) => ({
      uid: d.id,
      ...d.data(),
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};
