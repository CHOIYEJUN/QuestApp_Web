import { useNavigate} from "react-router-dom";
import  {useState} from "react";
import {styled} from "styled-components";
import {Center, useToast} from "@chakra-ui/react";
import {Input, StyleForm, Title, Wrapper} from "../style/styles";
import {assignUpHook} from "../hooks/assignHook";

export const ChackPasswoadSpan = styled.span`
  color: red;
`;

export default function CreateAccount() {


    const [isLoading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordChackSpan, setPasswordChackSpan] = useState("");
    const navigation = useNavigate();

    const toast = useToast();

    const onChange = (event) => {
      const {target : {name, value}} = event;
        if(name === "username"){
            setUsername(value);
        }else if(name === "phone"){
            setPhone(value);
        }else if(name === "password"){
            setPassword(value);
        }else if(name === "passwordConfirm"){
            if(password === value){
                setPasswordChackSpan("");
                setPasswordCheck(true);
            }else {
                setPasswordChackSpan("비밀번호가 일치하지 않습니다.");
                setPasswordCheck(false);
            }
            setPasswordConfirm(value);
        }
    };

    const onSubmit = async (event) => {
        if (username === "" || phone === "" || password === "" || !passwordCheck) {
            toast({
                title: "회원가입 실패",
                description: "모든 항목을 입력해주세요",
                status: "error",
                isClosable: true,
            })
            return
        }
        assignUpHook(username, phone, password);
        setError("");
        event.preventDefault();
        try {
            navigation("/login");

        }catch (e){
            setError(e.message);
            alert(error);
        } finally {
            setLoading(false);
        }

    };


    return (
        <>

            <Center>
        <Wrapper>
            <Title>회원가입</Title>
            <StyleForm onSubmit={onSubmit}>
                <Input
                    name = "username"
                    placeholder = "Username"
                    type = "text"
                    required
                    value = {username}
                    onChange = {onChange}
                />
                <Input
                    name = "phone"
                    placeholder = "phone"
                    type = "text"
                    required
                    value = {phone}
                    onChange = {onChange}

                />
                <Input
                    name = "password"
                    placeholder = "Password"
                    type = "password"
                    required
                    value = {password}
                    onChange = {onChange}
                />
                <Input
                    name = "passwordConfirm"
                    placeholder = "Password Confirm"
                    type = "password"
                    required
                    value = {passwordConfirm}
                    onChange = {onChange}
                />

                <Input
                    type = "submit"
                    value ={!isLoading ? "Loding..." : "Create Account"}

                />

            </StyleForm>
            <ChackPasswoadSpan>{passwordChackSpan}</ChackPasswoadSpan>

        </Wrapper>
            </Center>
        </>
    )
}
