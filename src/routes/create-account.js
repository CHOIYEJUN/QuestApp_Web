import { useNavigate} from "react-router-dom";
import  {useState} from "react";
import {styled} from "styled-components";
import {Button, Center, InputGroup, InputRightElement, useToast} from "@chakra-ui/react";
import {Input, StyleForm, Title, Wrapper} from "../style/styles";
import {assignUpHook, checkPhone} from "../hooks/assignHook";
import React from "react";
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
    const [belong, setBelong] = useState("");
    const navigation = useNavigate();
    const [isPhoneCheck,SetPhoneCheck ] = React.useState(false)

    const handleClick = async () => {

        if(phone === ""){
            toast({
                title: "전화번호를 입력해주세요",
                status: "error",
                isClosable: true,
            })
            return;
        }

        const checkPhoneState = await checkPhone(phone);
        console.log(checkPhoneState);

        if(checkPhoneState){
            SetPhoneCheck(true);
        }else if(!checkPhoneState){
            SetPhoneCheck(false);
            toast({
                title: "이미 가입된 전화번호 입니다.",
                status: "error",
                isClosable: true,
            })
        }

    }
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
        }else if(name === "belong"){
            setBelong(value);
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

        if(!isPhoneCheck){
            toast({
                title: "회원가입 실패",
                description: "전화번호 중복체크를 해주세요",
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
                            placeholder = "닉네임"
                            type = "text"
                            required
                            value = {username}
                            onChange = {onChange}

                        />
                        <InputGroup size='md'>
                            <Input
                                name = "phone"
                                placeholder = "휴대전화번호"
                                type = "text"
                                required
                                value = {phone}
                                onChange = {onChange}

                            />
                            <InputRightElement width=''>
                                <Button
                                    h='30px'
                                    m={'15px 0 0 0'}
                                    size='sm'
                                    onClick={handleClick}
                                    colorScheme={isPhoneCheck ? 'green' : 'gray'}

                                >
                                    {isPhoneCheck ? '체크완료' : '중복체크'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Input
                            name = "password"
                            placeholder = "비밀번호"
                            type = "password"
                            required
                            value = {password}
                            onChange = {onChange}
                        />
                        <Input
                            name = "passwordConfirm"
                            placeholder = "비밀번호 확인"
                            type = "password"
                            required
                            value = {passwordConfirm}
                            onChange = {onChange}
                        />
                        <Input
                            name = "belong"
                            placeholder = "비밀번호 확인"
                            type = "password"
                            required
                            value = {belong}
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
