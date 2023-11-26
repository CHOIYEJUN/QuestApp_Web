import { useNavigate} from "react-router-dom";
import  {useState} from "react";
import {styled} from "styled-components";
import {Center} from "@chakra-ui/react";

export const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  width: 500px;
  height: 600px;
  padding: 30px 30px;
  border-radius: 20px;
  background-color: #000;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  opacity: 0.8;

`;
export const Title = styled.h1`
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 20px;
    `

export const StyleForm = styled.form`
        
        margin-top: 50px;
    `

export const Input = styled.input`
      padding: 10px 20px;
      margin: 5px 0px;
      border-radius: 10px;
      width: 100%;
      &[type="submit"] {
        cursor : pointer;
        &:hover{
          opacity: 0.8;
        }
      }
    `

export const BgVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: -1;
  opacity: 1;
  pointer-events: none;
  
`;

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
    const navigation = useNavigate();

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
        }
    };

    const onSubmit = async (event) => {
        if (username === "" || email === "" || password === "" || !passwordCheck) {
            alert("모든 입력을 확인해주세요")
            return
        }
        setError("");
        event.preventDefault();
        try {
            navigation("/");

        }catch (e : any){
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
                    name = "email"
                    placeholder = "Email"
                    type = "text"
                    required
                    value = {email}
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
