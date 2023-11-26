import {Box, Center, HStack, Text, VStack} from "@chakra-ui/react";
import Calendar from "../components/MyState/Calendar";
import MyPageButton from "../components/MyState/MyPageButton";
import SteampButton from "../components/MyState/SteampButton";
import StateButton from "../components/MyState/StateButton";
import EventButton from "../components/MyState/EventButton";

export default function MyState () {
    const userName = localStorage.getItem("user_name");
    const startYMD = "2021-10-01";

    return(
        <>
            <VStack
                margin={'30px 0 0 0'}
            >
                <Box>
                    <Text
                        fontSize={'xl'}
                        fontWeght={'bold'}
                    >
                        {userName}님의 퀘스트 진행판
                    </Text>
                </Box>
                <Center
                    bg={'#F2F2F2'}
                    w={'100%'}
                    p={'10px 0 10px 0'}
                >
                    <Calendar/>
                </Center>
                <center
                >
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                    >
                        {userName}님은 {startYMD} 에 퀘스트를 시작해
                    </Text>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                    >
                       현재 퀘스트를 진행한지 D+ 28일 되었어요!
                    </Text>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                    >
                       총 00 개의 "참 잘했어요"
                    </Text>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                    >
                        총 00 개의 "잘했어요" 를 획득했습니다.
                    </Text>

                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                    >
                        이번 달 캘린더 날씨 : 맑음
                    </Text>
                </center>

                <HStack
                    display={'flex'}
                    justifyContent={'space-between'}
                    w={'80%'}
                >
                    <MyPageButton/>
                    <SteampButton/>
                    <StateButton/>
                    <EventButton/>
                </HStack>

            </VStack>
        </>
    )

}
