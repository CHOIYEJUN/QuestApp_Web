import axios from 'axios';
import {addDoc, collection, doc, getDocs, where, query, setDoc, deleteDoc, getDoc} from "firebase/firestore";
import {auth, DBservice} from "../fireBase";

const url = 'http://13.209.21.173:9095/Diary/';
const allowOrigin = 'https://dailyquest-a912d.web.app/';
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
//만약 date 가 한자리 라면 앞에 0 붙혀줘야 함
//ex) 2021-04-1 -> 2021-04-01 로 바꿔줘야 함
const fixedDate = date < 10 ? "0" + date : date;
const week = ['일', '월', '화', '수', '목', '금', '토'];
const todayString = year + "-" + month + "-" + fixedDate;

export const getAllStemp = async () => {
    try {
        const getAllSteampQuery = query(
            collection(DBservice, "stemp")
        );
        const querySnapshot = await getDocs(getAllSteampQuery);

        const stempList = [];
        querySnapshot.forEach((doc) => {
            stempList.push(doc.data());
        });
        console.log(stempList);
        return stempList;

    }
    catch (error) {
        console.log(error);
        return "fail";
    }
}

export const getStemp = async () => {
    try {
        const getAllSteampQuery = query(
            collection(DBservice, "stemp"),
            where("uid", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(getAllSteampQuery);

        const stempList = [];
        querySnapshot.forEach((doc) => {
            stempList.push(doc.data());
        });
        console.log(stempList);
        return stempList;

    }
    catch (error) {
        console.log(error);
        return "fail";
    }
}

export const insertStemp = async () => {

    try {

        const steampQuery = query(
            collection(DBservice, "stemp"),
            where("uid", "==", auth.currentUser.uid),
            where("quest_date", "==", todayString)
        );

        const querySnapshot = await getDocs(steampQuery);

        if (querySnapshot.docs.length > 0) {
            return "already";
        }
        // 새 문서 추가
        await addDoc(collection(DBservice, "stemp"), {
            uid: auth.currentUser.uid,
            user_name: auth.currentUser.displayName,
            quest_date: todayString,
            quest_status: "excellent",
        });
        return "success";

    }
    catch (error) {

        console.log(error);
        return "fail";
    }

}

export const insertCheckOtherDay = async (item) => {
    try {

        // 새 문서 추가
        await addDoc(collection(DBservice, "stemp"), {
            uid: auth.currentUser.uid,
            user_name: auth.currentUser.displayName,
            quest_date: item.start,
            quest_status: "good",
        });
        return "success";

    }
    catch (error) {

        console.log(error);
        return "fail";
    }
}

export const deleteStemp = async (item) => {
    try {

        const steampQuery = query(
            collection(DBservice, "stemp"),
            where("uid", "==", auth.currentUser.uid),
            where("quest_date", "==", item)
        );
        const querySnapshot = await getDocs(steampQuery);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        return "success";


    }
    catch (error) {
        console.log(error);
        return "fail";
    }

}

export const getUserCount = async () => {
    try {
        const getAllUserQuery = query(
            collection(DBservice, "users")
        );
        const querySnapshot = await getDocs(getAllUserQuery);

        const userList = [];
        querySnapshot.forEach((doc) => {
            userList.push(doc.data());
        });
        console.log(userList);
        return userList.length;

    }
    catch (error) {
        console.log(error);
        return "fail";
    }
}
