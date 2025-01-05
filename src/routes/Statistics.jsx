import {Box, Button, Center, HStack,  Image, Img, Text, useToast, VStack} from "@chakra-ui/react";
import Calendar from "../components/Statistics/Calendar";
import {FaCaretLeft, FaCaretRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {
    REACT_APP_STEAMP_IMG_1,
    REACT_APP_STEAMP_IMG_10, REACT_APP_STEAMP_IMG_2,
    REACT_APP_STEAMP_IMG_3,
    REACT_APP_STEAMP_IMG_4,
    REACT_APP_STEAMP_IMG_5,
    REACT_APP_STEAMP_IMG_6,
    REACT_APP_STEAMP_IMG_7,
    REACT_APP_STEAMP_IMG_8,
    REACT_APP_STEAMP_IMG_9
} from "../components/common/path";
import {useState} from "react";


export default function Statistics () {

    const kingImg = "https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EC%99%95%EA%B4%80.png?alt=media&token=1b05cd1c-37be-49d3-a912-7f3e16486ed2"
    const navigation = useNavigate();
    const toast = useToast();
    const [thisMonth_1st, setThisMonth_1st] = useState({});
    const [thisMonth_2nd, setThisMonth_2nd] = useState({});
    const [thisMonth_3rd, setThisMonth_3rd] = useState({});
    const [total_1nd, setTotal_1nd] = useState({});
    const [total_2nd, setTotal_2nd] = useState({});
    const [total_3rd, setTotal_3rd] = useState({});
    const [total_4th, setTotal_4th] = useState({});


    const steampProps = (propsData) => {

        thisMonthCurcle(propsData);
        totalCurcle(propsData);
    }

    const totalCurcle = (propsData) => {
        const scores = propsData.reduce((acc, curr) => {
            const score = curr.quest_status === 'excellent' ? 5 : curr.quest_status === 'good' ? 3 : 0;
            if (acc[curr.uid]) {
                acc[curr.uid].score += score;
            } else {
                acc[curr.uid] = { name: curr.user_name, score: score };
            }
            return acc;
        }, {});
        const sortedScores = Object.values(scores).sort((a, b) => b.score - a.score);
        totleCurrentSeampImg(sortedScores);

    }

    const thisMonthCurcle = (propsData) => {
        const thisMonthItem = propsData.filter((item) => {
            return item.quest_date.substring(0, 7) === new Date().toISOString().substring(0, 7);
        });
        const scores = thisMonthItem.reduce((acc, curr) => {
            const score = curr.quest_status === 'excellent' ? 5 : curr.quest_status === 'good' ? 3 : 0;
            if (acc[curr.uid]) {
                acc[curr.uid].score += score;
            } else {
                acc[curr.uid] = { name: curr.user_name, score: score };
            }
            return acc;
        }, {});
        const sortedScores = Object.values(scores).sort((a, b) => b.score - a.score);
        currentSeampImg(sortedScores);
    }


    const currentSeampImg = (sortedScores) => {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() -1);
        const lastDayNum = lastDay.getDate();
        const maxScore = lastDayNum * 5;

        sortedScores.map((item, index) => {
            const myScore = item.score;
            const percent = Math.ceil((myScore / maxScore) * 100);

            item.img = percentByImg(percent);
        });

        setThisMonth_1st(sortedScores[0]);
        setThisMonth_2nd(sortedScores[1]);
        setThisMonth_3rd(sortedScores[2]);
    }

    const totleCurrentSeampImg = (sortedScores) => {
        const today = new Date();
        const lastDay = new Date(2024, 0, 3 );
        // 오늘에서 lastDay를 빼면 몇일이 지났는지 계산해야해
        const lastDayNum = Math.ceil((today.getTime() - lastDay.getTime()) / (1000 * 3600 * 24));
        const maxScore = lastDayNum * 5;

        sortedScores.map((item, index) => {
            const myScore = item.score;
            const percent = Math.ceil((myScore / maxScore) * 100);

            item.img = percentByImg(percent);
        });

        setTotal_1nd(sortedScores[0]);
        setTotal_2nd(sortedScores[1]);
        setTotal_3rd(sortedScores[2]);
        setTotal_4th(sortedScores[3]);
    }

    const percentByImg = (percent) => {
        let imgUrl = "";

        if(percent >= 90) {
            imgUrl = REACT_APP_STEAMP_IMG_10;
        }else if (percent >= 80) {
            imgUrl = REACT_APP_STEAMP_IMG_9;
        }else if(percent >= 70) {
            imgUrl = REACT_APP_STEAMP_IMG_8;
        } else if(percent >= 60) {
            imgUrl = REACT_APP_STEAMP_IMG_7;
        } else if(percent >= 50) {
            imgUrl = REACT_APP_STEAMP_IMG_6;
        } else if(percent >= 40) {
            imgUrl = REACT_APP_STEAMP_IMG_5;
        } else if(percent >= 30) {
            imgUrl = REACT_APP_STEAMP_IMG_4;
        } else if(percent >= 20) {
            imgUrl = REACT_APP_STEAMP_IMG_3;
        } else if(percent >= 10) {
            imgUrl = REACT_APP_STEAMP_IMG_2;
        } else {
            imgUrl = REACT_APP_STEAMP_IMG_1;
        }

        return imgUrl;
    }

    const onClick = (e) => {
        if(e.target.name === "myState"){
            navigation("/myState");
        }else if(e.target.name === "bibleTracker") {
            navigation("/bibleTracker");
        }
    }

    return (
            <VStack
                margin={'30px 0 0 0'}
            >
                <Box>
                    <Text
                        fontSize={'xl'}
                        fontWeght={'bold'}
                    >
                        모두의 진행판
                    </Text>
                </Box>
                <Center
                    bg={'#F2F2F2'}
                    w={'100%'}
                    p={'10px 0 10px 0'}
                >
                    <Calendar propFunction={steampProps}/>

                </Center>
                <HStack width={'100%'} justifyContent={'center'}>
                    <Box background={'#3298af'} width={'20px'} height={'20px'}>
                        <Img src={"https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%ED%95%98%ED%8A%B8.png?alt=media&token=1bd227db-f679-4a83-8557-0b7e4f7a200f"}></Img>
                    </Box>
                    <Text fontSize={'10px'}>
                        모두가 읽었어요
                    </Text>

                    <Box background={'#3298af'} width={'20px'} height={'20px'}></Box>
                    <Text fontSize={'10px'}>
                        절반이상이 읽었어요
                    </Text>

                    <Box background={'#e8e4ba'} width={'20px'} height={'20px'}></Box>
                    <Text fontSize={'10px'}>
                        절반이하만 읽었어요
                    </Text>
                </HStack>

                <Box
                    w={'100%'}
                    h={'120px'}
                    bg={'#c3e1ea'}
                >
                    <Text
                        fontSize={'xl'}
                        fontWeght={'bold'}
                        position={'absolute'}
                        right={'5px'}
                        m={'5px 0 0 0'}
                    >
                        이번달 캘린더 날씨
                    </Text>

                    <HStack
                        w={'100%'}
                        h={'100%'}
                        alignItems={"baseline"}
                        m={'10px 0 0 10px'}

                    >

                        <Box
                            w={'90px'}
                        >
                            <Image
                                src={thisMonth_1st?.img}
                                w={'90px'}
                                h={'90px'}
                                alignItems={'center'}

                            />
                            <Text
                                fontSize={"12px"}
                                textAlign={'center'}
                            >
                                {thisMonth_1st?.name}
                            </Text>

                        </Box>

                        <Box
                            w={'75px'}
                        >
                            <Image
                                src={thisMonth_2nd?.img}
                                w={'75px'}
                                h={'75px'}
                                alignItems={'center'}
                                m={'10px 0 0 0'}

                            />
                            <Text
                                fontSize={"12px"}
                                textAlign={'center'}
                            >
                                {thisMonth_2nd?.name}
                            </Text>

                        </Box>

                        <Box
                            w={'50px'}
                        >
                            <Image
                                src={thisMonth_3rd?.img}
                                w={'50px'}
                                h={'50px'}
                                alignItems={'center'}
                                m={'10px 0 0 0'}

                            />
                            <Text
                                fontSize={"12px"}
                                textAlign={'center'}
                            >
                                {thisMonth_3rd?.name}
                            </Text>

                        </Box>
                    </HStack>

                </Box>

                <HStack
                    w={'100%'}
                    h={'100px'}
                >
                    <Box
                        w={'50%'}
                        h={'100%'}
                        bg={'#FF5C0B'}
                    >
                        <VStack
                            gap={0}
                        >
                            <Text
                                color={'white'}
                            >
                                누적 1등
                            </Text>

                            <Image
                                src={kingImg}
                                alignItems={'center'}
                            >

                            </Image>

                            <Text
                                color={'white'}
                                textAlign={'center'}
                            >
                                {total_1nd?.name}
                            </Text>


                        </VStack>



                    </Box>
                    <Box
                        w={'50%'}
                        h={'100%'}
                        bg={'#94714E'}
                    >
                        <VStack
                            gap={0}
                        >
                            <Text
                                color={'white'}
                            >
                                누적 캘린더 순위
                            </Text>

                            <HStack>
                                <Box
                                    position={'relative'}
                                >
                                    <Text
                                        fontSize={"10px"}
                                        color={'black'}
                                        position={'absolute'}
                                        top={'5px'}
                                        left={'16px'}
                                        fontWeight={'bold'}
                                    >
                                        2등
                                    </Text>
                                    <Image
                                        src={total_2nd?.img}
                                        w={'50px'}
                                        alignItems={'center'}
                                    >
                                    </Image>
                                    <Text
                                        fontSize={"10px"}
                                        color={'white'}
                                        textAlign={'center'}
                                    >
                                        {total_2nd?.name}
                                    </Text>
                                </Box>

                                <Box
                                    position={'relative'}
                                >
                                    <Text
                                        fontSize={"10px"}
                                        color={'black'}
                                        position={'absolute'}
                                        top={'5px'}
                                        left={'16px'}
                                        fontWeight={'bold'}
                                        textAlign={'center'}
                                    >
                                        3등
                                    </Text>
                                    <Image
                                        src={total_3rd?.img}
                                        w={'50px'}
                                        alignItems={'center'}
                                    >
                                    </Image>
                                    <Text
                                        fontSize={"10px"}
                                        color={'white'}
                                        textAlign={'center'}
                                    >
                                        {total_3rd?.name}
                                    </Text>
                                </Box>

                                <Box
                                    position={'relative'}
                                >
                                    <Text
                                        fontSize={"10px"}
                                        color={'black'}
                                        position={'absolute'}
                                        top={'5px'}
                                        left={'16px'}
                                        fontWeight={'bold'}
                                    >
                                        4등
                                    </Text>
                                    <Image
                                        src={total_4th?.img}
                                        w={'50px'}
                                        alignItems={'center'}
                                    >
                                    </Image>
                                    <Text
                                        fontSize={"10px"}
                                        color={'white'}
                                        textAlign={'center'}
                                    >
                                        {total_4th?.name}
                                    </Text>
                                </Box>
                            </HStack>

                        </VStack>
                    </Box>


                </HStack>


                <HStack
                    justifyContent={'space-between'}
                    width={'95%'}
                >

                    <Button
                        bg={'#3b3b3b'}
                        color={'white'}
                        fontSize={'14px'}
                        w={"100px"}
                        name={"myState"}
                        onClick={onClick}
                    >
                        <FaCaretLeft />
                         마이페이지
                    </Button>

                    <Button
                        bg={'#3b3b3b'}
                        color={'white'}
                        fontSize={'14px'}
                        w={"100px"}
                        name={"bibleTracker"}
                        onClick={onClick}
                    >
                        성경 읽기표
                        <FaCaretRight />
                    </Button>


                </HStack>




            </VStack>
        )
}
