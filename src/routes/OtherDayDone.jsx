import {Button, Center, Img, Text} from "@chakra-ui/react";
import {Wrapper} from "../style/styles";
import {styled} from "styled-components";
import {useNavigate} from "react-router-dom";

const Wrappers = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    width: 300px;
    height: 500px;
    padding: 30px 30px;
    border-radius: 20px;
    opacity: 0.8;
    background: url(${props => props.bg});
`;

export default function OtherDayDone() {
    const navigation = useNavigate();
    const onClick = (e) => {
        if(e.target.name === "myState"){
            navigation("/myState");
        }else if(e.target.name === "outher") {
            navigation("/checkOtherDay");
        }
    }

    return (
        <>
            <Center>
                <Wrappers
                    bg={'src=https://firebasestorage.googleapis.com/v0/b/mintonmap-7f2e8.appspot.com/o/TodayDoneImg%2FgoodJobEx.gif?alt=media&token=6379a069-5844-4d4c-8cac-7020a0397a7a'}
                >
                    <Img
                        src={"https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EC%9E%98%ED%96%88%EC%96%B4%EC%9A%94.png?alt=media&token=0f70e110-b012-4bdb-b21a-483a0596000d"}
                    >

                    </Img>
                    <Text
                        fontSize={'xl'}
                        fontWeght={'bold'}
                    >
                        선택하신 날에 "잘했어요!"
                    </Text>
                    <Text
                        fontSize={'l'}
                    >
                        스탬프를 획득하셨습니다!
                    </Text>

                    <Button
                        w={'100%'}
                        margin={'10px 0 10px 0'}
                        name={"myState"}
                        onClick={onClick}

                    >
                        와 현재 진행상황 볼래요 😊
                    </Button>
            


                </Wrappers>
            </Center>
        </>
    );
}
