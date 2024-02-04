import {useState} from "react";
import {styled} from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Center, HStack, useToast} from "@chakra-ui/react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, DBservice} from "../fireBase.js";
import { collection, doc, getDoc } from "firebase/firestore";

const Wrapper = styled.div`
  
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 100px;
      width: 300px;
      height: 500px;
      padding: 30px 30px;
      border-radius: 20px;
      opacity: 0.8;
  
    `;

const Title = styled.h1`
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 10px;
    `

const StyleForm = styled.form`
  
        margin-top: 20px;
    `

const Input = styled.input`
      padding: 10px 20px;
      margin: 5px 0px;
      border-radius: 10px;
      border: 1px solid #dbdbdb;
      width: 100%;
      &[type="submit"] {
        cursor : pointer;
        &:hover{
          opacity: 0.8;
        }
      } 
      color: #000;
  
    `
const Switcher = styled.div`
      margin-top: 20px;
      font-size: 0.9em;
        a {
            color: #0095f6;
            margin-left: 5px;
            font-weight: 600;
            text-decoration: none;
        }
`



export default function Login() {
    const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigate();
    const toast = useToast();


    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        if (email === "" || password === "" ) {
            toast({
                title: "로그인 실패",
                description: "모든 항목을 입력해주세요",
                status: "error",
                isClosable: true,
            })
            return
        }
        setError("");
        event.preventDefault();
        try {
            setLoading(true);
            localStorage.clear();
            // loginHook 함수가 다 끝난 뒤 loginValue 에 값을 넣어준다.
            const loginValue = await signInWithEmailAndPassword(auth ,email, password);
            const userDoc = doc(DBservice, "users" ,loginValue.user.uid );

            getDoc(userDoc).then((docSnap) => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    localStorage.setItem("belong", docSnap.data().belong);
                    localStorage.setItem("startDay", docSnap.data().startDay);
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            seveUserInfoLocalStorage(loginValue.user);
            window.location.replace("/");
            setLoading(false);
        }catch (e){

            toast({
                title: "로그인 실패",
                description: "아이디와 비밀번호를 확인해주세요",
                status: "error",
                isClosable: true,
            })

        } finally {
            setLoading(false);
        }

    };

    const seveUserInfoLocalStorage = (user) => {
        localStorage.setItem("user_name", user.displayName );
        localStorage.setItem("user_email", user.email );
        localStorage.setItem("user_uid", user.uid );
    }

    return (
        <>
        <Center>
            <HStack>
        <Wrapper>
            <Title>로그인</Title>
            <StyleForm onSubmit={onSubmit} >
                <Input
                    name = "email"
                    placeholder = "이메일 입력"
                    type = "text"
                    value = {email}
                    onChange = {onChange}
                />
                <Input
                    name = "password"
                    placeholder = "비밀번호"
                    type = "password"
                    value = {password}
                    onChange = {onChange}
                />
                <Input
                    type = "submit"
                    value ={!isLoading ? "Loding..." : "로그인"}
                />

            </StyleForm>

            <Switcher>
                계정이 없으신가요?{" "}
                <Link to="/create-account">회원가입</Link>
            </Switcher>
        </Wrapper>
                </HStack>
            </Center>
        </>
    )
}
