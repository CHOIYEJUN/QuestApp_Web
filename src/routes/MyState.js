import {Box, Center, HStack, Image, Text, VStack} from "@chakra-ui/react";
import Calendar from "../components/MyState/Calendar";
import MyPageButton from "../components/MyState/MyPageButton";
import SteampButton from "../components/MyState/SteampButton";
import StateButton from "../components/MyState/StateButton";
import EventButton from "../components/MyState/EventButton";
import {useState} from "react";

export default function MyState () {
    const userName = localStorage.getItem("user_name");
    const startYMD = "2024-01-03";
    // 오늘 날짜와 startYMD 를 비교해서 D + 몇일인지 계산하는 로직이 필요함
    const today = new Date();
    const start = new Date(startYMD);
    const diffDay = Math.ceil((today.getTime() - start.getTime()) / (1000 * 3600 * 24));

    console.log(diffDay);


    const [excellentCount, setExcellentCount] = useState(0);
    const [goodCount, setGoodCount] = useState(0);

    const steampProps = (excellentNum, goodNum) => {
        setExcellentCount(excellentNum);
        setGoodCount(goodNum);
    }

    const weather10_Moning = "https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A810%20%EC%95%84%EC%B9%A8.png?alt=media&token=e5cb7fa6-9ffc-41ef-b1af-fabbec480180"


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
                    <Calendar propFunction={steampProps}/>
                </Center>
                <center
                >
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                        m={'5px 0 0 0'}
                    >
                        현재 퀘스트를 진행한지 <span style={{background:"#eee"}}>D+{diffDay}</span>일 되었어요!
                    </Text>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                        m={'5px 0 0 0'}
                    >
                        총 <span style={{color:"green"}}>{excellentCount}</span> 개의  <span style={{background:"#E5F4D4"}}>"참 잘했어요"</span>
                    </Text>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                        m={'5px 0 0 0'}
                    >
                        총 <span style={{color:"#faa47a"}}>{goodCount}</span> 개의
                         <span style={{background:"#FFEAE0"}}>"잘했어요"</span> 를 획득했습니다.
                    </Text>
                </center>
                <HStack
                    m={'10px 0'}
                    w={'100%'}
                    h={'40px'}
                    backgroundImage={'url(https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A8.png?alt=media&token=94231feb-9217-4c97-848c-6f644cf74a7e)'}
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                >
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                        color={'black'}
                        m={'12px 0 0 50px'}
                    >
                        이번달 캘린더 날씨 :
                    </Text>

                    <Image
                        src={weather10_Moning}
                        w={'50px'}
                        h={'50px'}
                        m={'0 0 0 20px'}
                    ></Image>

                </HStack>
                <HStack
                    display={'flex'}
                    justifyContent={'space-between'}
                    m={'5px 0 0 0'}
                    w={'80%'}
                >
                    <MyPageButton/>
                    <SteampButton/>
                    <StateButton/>
                    <EventButton/>
                </HStack>

                <HStack
                    display={'flex'}
                    justifyContent={'space-between'}
                    m={'5px 0 0 0'}
                    w={'80%'}
                >
                    <Text fontSize={'small'}>준비중</Text>
                    <Text fontSize={'small'}>기록하기</Text>
                    <Text fontSize={'small'}>통계페이지</Text>
                    <Text fontSize={'small'}>준비중</Text>
                </HStack>

            </VStack>
        </>
    )

}
