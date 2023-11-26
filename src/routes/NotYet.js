import {Button, Center, Img, Text} from "@chakra-ui/react";
import {Wrapper} from "../style/styles";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Notyet() {
    const navigation = useNavigate();
    const onClick = (e) => {
        if(e.target.name === "myState"){
            navigation("/myState");
        }else if(e.target.name === "outher"){
            navigation("/checkOtherDay");
        }
    }


        const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

        useEffect(() => {
            const calculateTimeRemaining = () => {
                const now = new Date();
                const tomorrow = new Date(now);
                tomorrow.setDate(now.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);

                const timeDiff = tomorrow - now;

                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                setTimeRemaining({ hours, minutes, seconds });
            };

            const intervalId = setInterval(calculateTimeRemaining, 1000);

            // Cleanup function to clear the interval when the component unmounts
            return () => clearInterval(intervalId);
        }, []);

    return (
        <>
            <Center>

                <Wrapper>
                    <Img
                        src={"https://firebasestorage.googleapis.com/v0/b/mintonmap-7f2e8.appspot.com/o/TodayDoneImg%2FnotyetBGC.png?alt=media&token=22a02f1c-5708-4b41-a07b-18b1838029f1"}
                        position={'absolute'}
                        top={'130px'}


                    />
                    <Text
                        fontSize={'xl'}
                        fontWeght={'bold'}
                    >
                        아직 내일까지
                    </Text>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                    >
                        {timeRemaining.hours} 시간 {timeRemaining.minutes} 분 {timeRemaining.seconds} 초 남았으니
                    </Text>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                    >
                        끝까지 화이팅!! 💪💪
                    </Text>

                    <Button
                        w={'100%'}
                        margin={'100px 0 10px 0'}
                        name={"myState"}
                        onClick={onClick}
                    >
                        전체 현황 볼래요
                    </Button>
                    <Button
                        w={'100%'}
                        margin={'10px 0 10px 0'}
                        name={"yes"}
                        onClick={onClick}
                    >
                        오늘이 아닌 다른 날 것을 했어요
                    </Button>
                </Wrapper>
            </Center>
        </>
    );
}
