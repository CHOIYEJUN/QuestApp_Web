import {collection, getDocs, query} from "firebase/firestore";
import {DBservice} from "../fireBase";
import {UserData} from "../type/UserType";

export const fetchUserDataAll = async ()=> {

    try {
        const getAllUser = query(
            collection(DBservice, "users")
        );
        const querySnapshot = await getDocs(getAllUser);

        const userList : UserData[] = [];
        querySnapshot.forEach((doc) => {
            userList.push(doc.data() as UserData);
        });
        console.log(userList);
        return userList;

    }catch (e) {
        console.log(e);
        return [];
    }



}


