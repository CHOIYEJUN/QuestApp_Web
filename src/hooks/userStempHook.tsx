import {collection, deleteDoc, getDocs, query, where} from "firebase/firestore";
import {DBservice} from "../fireBase";
import {DeleteEvent, SteamType} from "../type/SteamType";
import {ex} from "@fullcalendar/core/internal-common";

export const getuserByStemp = async (user_ID : string) => {

    try {
        const stemp = await getDocs(query(collection(DBservice, "stemp"), where("uid", "==", user_ID)));
        const stempList:SteamType[] = [];
        stemp.forEach((doc) => {
            stempList.push(doc.data() as SteamType);
        });
        return stempList;
    }catch (e) {
        console.log(e);
        return [];
    }

}

export const DeleteUserStemp = async (deleteDate : DeleteEvent) => {

    try{
        const steampQuery = query(
            collection(DBservice, "stemp"),
            where("uid", "==", deleteDate.uid),
            where("quest_date", "==", deleteDate.start)
        );
        const querySnapshot = await getDocs(steampQuery);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        return "success";

    }catch (e){
        console.log(e);
        return "fail";
    }

}
