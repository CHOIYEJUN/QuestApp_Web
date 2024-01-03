import {Navigate, useNavigate} from "react-router-dom";
import {auth} from "../fireBase.js";
import {useEffect} from "react";

export default function PrivateRoute ({ element }) {

    console.log(element)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user === null) {
                // 사용자가 로그인하지 않은 경우 리다이렉션 수행
                window.location.replace("/login");
                alert("로그인 되어있지 않습니다. 다시 로그인 해주세요");
            }
        });
        return () => unsubscribe(); // cleanup 함수를 이용하여 구독 취소
    }, []);

    return element;

}

