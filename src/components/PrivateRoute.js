import {useNavigate} from "react-router-dom";

export default function LoginStateChack () {

    const loginState = localStorage.getItem("user_phone");
    const navigation = useNavigate();

    if(!loginState){
        navigation("/login");
    }
    return(
        <></>
    )
}
