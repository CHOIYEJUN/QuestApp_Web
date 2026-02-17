import {Box, Button, Center, Flex, Text, useToast} from "@chakra-ui/react";
import {Title, Wrapper} from "../style/styles";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import { bibleDate } from "../data/bibleSchedule";
import {getToday} from "../util/DateUtil";


export default function () {
    const [verses, setVerses] = useState([]);
    const navigation = useNavigate();
    const onClick = (e) => {
        if (e.target.name === "check") {
            navigation("/bibleTracker");
        } else if (e.target.name === "no") {
            navigation("/myState");
        }
    }





    useEffect(() => {
        setVerses(bibleDate[getToday()] || []);
    }, []);


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
                        오늘 성경을 읽으셨나요? 체크해주세요!
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
                        name={"check"}
                    >
                        성경 읽기 체크하기 📖
                    </Button>
                    <Button
                        w={'100%'}
                        margin={'0 0 10px 0'}
                        name={"no"}
                        onClick={onClick}
                    >
                        전체 현황 볼래요
                    </Button>




                </Wrapper>
            </Center>
        </>
    );
}
