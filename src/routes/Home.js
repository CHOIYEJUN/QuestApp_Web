import {Button, Center, Text, useToast} from "@chakra-ui/react";
import {Title, Wrapper} from "../style/styles";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {insertStemp} from "../hooks/stempHook";
import {useEffect} from "react";


export default function () {

    const navigation = useNavigate();
    const tost = useToast();
    const onClick = (e) => {
        if(e.target.name === "yes"){
            todayCheck();

        }else if(e.target.name === "no") {
            navigation("/notyet");
        }else if(e.target.name === "outher"){
            navigation("/checkOtherDay");
        }
    }


    const todayCheck = async () => {
        const insertStempState = await insertStemp();
        if(insertStempState === "success"){
            navigation("/todayDoen");
        }else if(insertStempState === "fail") {
            tost({
                title: "오류",
                description: "관리자에게 문의바랍니다.",
                status: "error",
                isClosable: true,
            })
        }else if(insertStempState === "already") {
            tost({
                title: "오류",
                description: "이미 스탬프를 받았습니다",
                status: "error",
                isClosable: true,
            })
            navigation("/myState");
        }
    }


    return (
        <>
            <Center>
                <Wrapper>
                    <Text
                        fontSize={'2xl'}
                        fontWeght={'bold'}
                    >
                        안녕하세요
                    </Text>
                    <Text
                        fontSize={'l'}
                        name={"no"}
                    >
                        오늘의 퀘스트 완료하셨나요?
                    </Text>


                    <Text
                        fontSize={'l'}
                        fontWeight={'bold'}

                    >
                    </Text>

                    <Button
                        w={'100%'}
                        margin={'10px 0 10px 0'}
                        onClick={onClick}
                        name={"yes"}
                    >
                        네 완료했어요! 😊
                    </Button>
                    <Button
                        w={'100%'}
                        margin={'0 0 10px 0'}
                        name={"no"}
                        onClick={onClick}
                    >
                        아니요 아직이요! 😢
                    </Button>
                    <Button
                        w={'100%'}
                        margin={'0 0 10px 0'}
                        name={"outher"}
                        onClick={onClick}
                    >
                        오늘이 아닌 다른 날 것 했어요 😁
                    </Button>

                </Wrapper>
            </Center>
        </>
    );
}
