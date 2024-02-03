import {Box, Center, HStack, Image, Text, VStack} from "@chakra-ui/react";
import Calendar from "../components/MyState/Calendar";
import MyPageButton from "../components/MyState/MyPageButton";
import SteampButton from "../components/MyState/SteampButton";
import StateButton from "../components/MyState/StateButton";
import EventButton from "../components/MyState/EventButton";
import {useEffect, useState} from "react";

export default function MyState () {
   const REACT_APP_STEAMP_IMG_10 ='https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A810%20%EC%95%84%EC%B9%A8.png?alt=media&token=e5cb7fa6-9ffc-41ef-b1af-fabbec480180'
   const REACT_APP_STEAMP_IMG_9 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A89%EC%95%84%EC%B9%A8.png?alt=media&token=132199f1-65a9-442c-b36e-7d639965641b'
   const REACT_APP_STEAMP_IMG_8 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A88.png?alt=media&token=7787ab14-20d8-43dc-9b59-c6519e9c8657'
   const REACT_APP_STEAMP_IMG_7 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A87.png?alt=media&token=ba791d20-a7a6-4e25-97bd-e51640e8d2c6'
   const REACT_APP_STEAMP_IMG_6 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A86.png?alt=media&token=d63f0301-2afa-4a07-87f3-828bda78ea6a'
   const REACT_APP_STEAMP_IMG_5 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A85.png?alt=media&token=49549fca-2af6-4179-bf8d-867829cb2fca'
   const REACT_APP_STEAMP_IMG_4 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A84.png?alt=media&token=d6a11b29-7aa3-4de7-a60b-c56bfa6d74ab'
   const REACT_APP_STEAMP_IMG_3 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A83.png?alt=media&token=4cab4d8c-5347-4bca-acc0-9f1b33b7e2d7'
   const REACT_APP_STEAMP_IMG_2 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A82.png?alt=media&token=88fa7084-b2fa-4eec-aa6d-4c4fa1cdcbd5'
   const REACT_APP_STEAMP_IMG_1 = 'https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A81.png?alt=media&token=2181bbf9-6b7a-41b1-8b43-28f822083660'

    const userName = localStorage.getItem("user_name");
    const startYMD = "2024-01-03";
    // 오늘 날짜와 startYMD 를 비교해서 D + 몇일인지 계산하는 로직이 필요함
    const today = new Date();
    const start = new Date(startYMD);
    const diffDay = Math.ceil((today.getTime() - start.getTime()) / (1000 * 3600 * 24));



    const [excellentCount, setExcellentCount] = useState(0);
    const [goodCount, setGoodCount] = useState(0);
    const [m_excellentCount, setM_excellentCount] = useState(0);
    const [m_goodCount, setM_goodCount] = useState(0);
    const [steampImg, setSteampImg] = useState("");
    const steampProps = (excellentNum, goodNum, m_excellentNum, m_goodNum) => {
        setExcellentCount(excellentNum);
        setGoodCount(goodNum);
        setM_excellentCount(m_excellentNum);
        setM_goodCount(m_goodNum);

    }

    useEffect(() => {

        carculationSteamp(excellentCount, goodCount);

    }, [m_excellentCount, m_goodCount]);

    const carculationSteamp = (excellentCount, goodCount) => {
        // excellentCount 는 5점 goodCount 는 3점으로 계산
        // 그리고 이번달 오늘까지의 만점을 기준 ex) 오늘이 2월 15일이면 2월달 만점은 15*5 = 75점
        // 내가 받은 점수 / 만점 * 100 = 퍼센트 로 나타내 주기!!

        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() -1);

        const lastDayNum = lastDay.getDate();
        const maxScore = lastDayNum * 5;
        const myScore = m_excellentCount * 5 + m_goodCount * 3;
        const percent = Math.ceil((myScore / maxScore) * 100);

        if(percent >= 90) {
            setSteampImg(REACT_APP_STEAMP_IMG_10);
        }else if (percent >= 80) {
            setSteampImg(REACT_APP_STEAMP_IMG_9);
        }else if(percent >= 70) {
            setSteampImg(REACT_APP_STEAMP_IMG_8);
        }else if(percent >= 60) {
            setSteampImg(REACT_APP_STEAMP_IMG_7);
        }else if(percent >= 50) {
            setSteampImg(REACT_APP_STEAMP_IMG_6);
        }else if(percent >= 40) {
            setSteampImg(REACT_APP_STEAMP_IMG_5);
        }else if(percent >= 30) {
            setSteampImg(REACT_APP_STEAMP_IMG_4);
        }else if(percent >= 20) {
            setSteampImg(REACT_APP_STEAMP_IMG_3);
        }else if(percent >= 10) {
            setSteampImg(REACT_APP_STEAMP_IMG_2);
        }else {
            setSteampImg(REACT_APP_STEAMP_IMG_1);
        }

    }


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
                        src={steampImg}
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
                    <Text fontSize={'small'}>로그아웃</Text>
                    <Text fontSize={'small'}>기록하기</Text>
                    <Text fontSize={'small'}>통계 페이지</Text>
                    <Text fontSize={'small'}>이벤트</Text>
                </HStack>

            </VStack>
        </>
    )

}
