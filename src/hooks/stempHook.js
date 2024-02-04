import axios from 'axios';
import {addDoc, collection, doc, getDocs, where, query, setDoc, deleteDoc, getDoc} from "firebase/firestore";
import {auth, DBservice} from "../fireBase";
import {getToday} from "../util/DateUtil";

const todayString = getToday();
const userID = localStorage.getItem("user_uid");

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
            where("uid", "==", userID)
        );
        const querySnapshot = await getDocs(getAllSteampQuery);

        const stempList = [];
        querySnapshot.forEach((doc) => {
            stempList.push(doc.data());
        });
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
            where("uid", "==", userID),
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

export const insertCheckAdminDay = async (item) => {
    try {

        // 새 문서 추가
        await addDoc(collection(DBservice, "stemp"), {
            uid: item.uid,
            user_name: item.user_name,
            quest_date: item.start,
            quest_status: item.status,
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
            where("uid", "==", userID),
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
        return userList.length;

    }
    catch (error) {
        console.log(error);
        return "fail";
    }
}
