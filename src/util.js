import {DBservice} from "./fireBase";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";

export async function CreateUserField(uid, email, username, belong) {
    const userDocRef = doc(collection(DBservice, "users"), uid);
    await setDoc(userDocRef, {
        uid: uid,
        email: email,
        username: username,
        belong: belong,
        createdAt: Date.now(),
        startDay: "2025-01-06",
    });
}
