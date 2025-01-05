import { useNavigate} from "react-router-dom";
import  {useState} from "react";
import {styled} from "styled-components";
import {
    Button,
    Center,
    InputGroup,
    InputRightElement,
    Select,
    useToast,
    Text,
    Checkbox,
    Box,
    HStack
} from "@chakra-ui/react";
import {AccountWrapper, Input, StyleForm, Title, Wrapper} from "../style/styles";
import React from "react";
import {IoCheckbox} from "react-icons/io5";
import {IoMdClose} from "react-icons/io";
import {auth} from "../fireBase.js";
import * as authService from "firebase/auth";
import {CreateUserField} from "../util";


export const ChackPasswoadSpan = styled.span`
  color: red;
`;

export default function CreateAccount() {


    const [isLoading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordChackSpan, setPasswordChackSpan] = useState("");
    const [belong, setBelong] = useState();
    const navigation = useNavigate();
    const toast = useToast();
    const emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "username"){
            setUsername(value);
        }else if(name === "email"){
            setEmail(value);
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

    const onSubmit = async (e) => {
        if (username === "" || email === "" || password === "" || !passwordCheck || belong === ''){
            toast({
                title: "회원가입 실패",
                description: "모든 항목을 입력해주세요",
                status: "error",
                isClosable: true,
            })
            return
        }

        if(!emailCheck.test(email)){
            toast({
                title: "이메일 입력을 확인해주세요",
                description: "이메일이 잘못된 형식으로 입력되었습니다.",
                status: "error",
                isClosable: true,
            })
            return
        }





        try {
            e.preventDefault();
            const data = await authService.createUserWithEmailAndPassword(auth , email, password);
            await authService.updateProfile(data.user, {
                displayName: username,
            });
            setError("");

            navigation("/login");
            CreateUserField(data?.user?.uid, email, username, belong);


        }catch (e){
            if (e.message === "Firebase: Error (auth/email-already-in-use)."){
                setError("동일한 이메일이 존재합니다.");
            }else if(e.message === "Firebase: Error (auth/invalid-email)."){
                setError("이메일 형식이 올바르지 않습니다.");
            }else if(e.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
                setError("비밀번호는 6자리 이상이어야 합니다.");
            }else if (e.message === "Firebase: Error (auth/operation-not-allowed)."){
                setError("이메일/비밀번호 계정이 활성화되지 않았습니다.");
            } else  {
                setError("알 수 없는 에러가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <Center>
                <AccountWrapper>
                    <Title>회원가입</Title>
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
                                name = "email"
                                placeholder = "이메일"
                                type = "text"
                                required
                                value = {email}
                                onChange = {onChange}
                            />
                        </InputGroup>
                        <Input
                            name = "password"
                            placeholder = "비밀번호 (8자리 이상)"
                            type = "password"
                            required
                            value = {password}
                            onChange = {onChange}
                        />
                        <InputGroup>
                                <Input
                                    name = "passwordConfirm"
                                    placeholder = "비밀번호 확인"
                                    type = "password"
                                    required
                                    value = {passwordConfirm}
                                    onChange = {onChange}
                                />

                            <InputRightElement
                                children={
                                    passwordCheck
                                        ?
                                        <IoCheckbox
                                            color={"green"}
                                            fontSize={"20px"}
                                        />
                                        :
                                        <IoMdClose
                                            color={"red"}
                                            fontSize={"20px"}
                                        />


                                }
                                alignItems={"center"}
                                justifyItems={"center"}
                                h={"55px"}
                            >
                            </InputRightElement>

                        </InputGroup>

                        <Input
                            name = "belong"
                            required
                            value = {belong}
                            onChange = {onChange}
                            placeholder = "소속 교회"
                        >
                        </Input>

                        <Input
                            name = "startDate"
                            placeholder = ""
                            type = "text"
                            required
                            value = {"2025-01-06"}
                            readOnly={true}
                        />

                        <HStack
                            spacing={"10px"}
                            alignItems={"center"}
                            justifyContent={'space-between'}
                            w={"100%"}
                            margin={"20px 0"}
                        >
                            <Text
                                fontSize={"14px"}
                                fontWeight={"bold"}
                            >
                                개인정보 수집에 동의합니다.
                            </Text>
                            <Checkbox
                                colorScheme="green"
                                size={"lg"}
                                defaultischecked={false}

                            />
                        </HStack>


                        <Button
                            onClick={onSubmit}
                            padding={"10px 20px"}
                            margin={"5px 0px"}
                            border-radius={"10px"}
                            border={"10px"}
                            width={"100%"}

                        >
                            {!isLoading ? "로딩중..." : "회원가입"}
                        </Button>
                </AccountWrapper>
            </Center>
        </>
    )
}
