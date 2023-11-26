import {useState} from "react";
import {styled} from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Center, HStack, useToast} from "@chakra-ui/react";
import {loginHook} from "../hooks/assignHook";

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
    const [phone, setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigate();
    const toast = useToast();


    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "phone"){
            setPhone(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        if (phone === "" || password === "" ) {
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
            // loginHook 함수가 다 끝난 뒤 loginValue 에 값을 넣어준다.

            const loginValue = await loginHook(phone, password);
            chackLogin(loginValue);
            setLoading(false);
        }catch (e){
            setError(e.message);
            alert(error);
        } finally {
            setLoading(false);
        }

    };

    const chackLogin = (loginValue) => {
        if(loginValue === "fail"){
            toast({
                title: "로그인 실패",
                description: "아이디와 비밀번호를 확인해주세요",
                status: "error",
                isClosable: true,
            })
            return
        }
        if(loginValue === "success") {
            navigation("/");
        }
    }
    return (
        <>
        <Center>
            <HStack>
        <Wrapper>
            <Title>로그인</Title>
            <StyleForm onSubmit={onSubmit} >
                <Input
                    name = "phone"
                    placeholder = "휴대전화번호 - 없이 입력"
                    type = "text"
                    value = {phone}
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
                <Link to="/create-account">회원가입 >> </Link>
            </Switcher>
        </Wrapper>
                </HStack>
            </Center>
        </>
    )
}
