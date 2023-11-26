import {Box, Button, Center, HStack, Text, useToast, VStack} from "@chakra-ui/react";
import Calendar from "../components/CheckOtherDay/Calendar";
import {useRef} from "react";
import {insertCheckOtherDay, insertStemp} from "../hooks/stempHook";
import {useNavigate} from "react-router-dom";


export default function CheckOtherDay() {
    const userName = localStorage.getItem("user_name");
    const childComponentRef = useRef();
    const toster = useToast();
    const navigation = useNavigate();
    const onClick = async  (e) => {
        const childValue = childComponentRef.current.getChildValue();
        let insertCheckOtherDayState = "";
        if(childValue.length === 0) {
            toster({
                title: "오류",
                description: "날짜를 선택해주세요.",
                status: "error",
                isClosable: true,
            })
            return;
        }
        const promises = childValue.map(item => item.isSend ? insertCheckOtherDay(item) : Promise.resolve());

        const results = await Promise.all(promises);

        results.forEach((insertCheckOtherDayState, index) => {
            if (insertCheckOtherDayState === "success") {
                toster({
                    title: "완료",
                    description: "출석체크가 완료되었습니다.",
                    status: "success",
                    isClosable: true,
                })
                navigation("/myState");
            } else if(insertCheckOtherDayState === "fail") {
                toster({
                    title: "오류",
                    description: "관리자에게 문의바랍니다.",
                    status: "error",
                    isClosable: true,
                })
            }
        });
    }

    return(
        <>
            <VStack
                margin={'100px 0 0 0'}
            >
                <Box>
                    <Text
                        fontSize={'1.2em'}
                        font-weght={'800'}
                    >
                        어떤 날의 퀘스트를 진행 하셨나요?
                    </Text>
                </Box>
                <Center
                    bg={'#F2F2F2'}
                    w={'100%'}
                    p={'10px 0 10px 0'}
                >
                    <Calendar ref={childComponentRef}/>
                </Center>

                <Button
                    w={'80%'}
                    margin={'10px 0 10px 0'}
                    onClick={onClick}
                >
                    선 택 완 료
                </Button>
            </VStack>
        </>
    )
}
