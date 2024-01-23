import {Box, Button, Center, HStack, Icon, IconButton, Image, Img, Text, useToast, VStack} from "@chakra-ui/react";
import Calendar from "../components/Statistics/Calendar";
import {FaCaretLeft, FaCaretRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";


export default function Statistics () {

    const weather10_Moning = "https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EB%82%A0%EC%94%A810%20%EC%95%84%EC%B9%A8.png?alt=media&token=e5cb7fa6-9ffc-41ef-b1af-fabbec480180"
    const kingImg = "https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%EC%99%95%EA%B4%80.png?alt=media&token=1b05cd1c-37be-49d3-a912-7f3e16486ed2"
    const navigation = useNavigate();
    const toast = useToast();

    const onClick = (e) => {
        if(e.target.name === "myState"){
            navigation("/myState");
        }else if(e.target.name === "event") {
            toast({
                title: "준비중인 서비스입니다.",
                status: "warning",
                duration: 1000,
                isClosable: true,

            });
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
                    <Calendar />

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
                                src={weather10_Moning}
                                w={'90px'}
                                h={'90px'}
                                alignItems={'center'}

                            />
                            <Text
                                fontSize={"12px"}
                                textAlign={'center'}
                            >
                                유저이름
                            </Text>

                        </Box>

                        <Box
                            w={'75px'}
                        >
                            <Image
                                src={weather10_Moning}
                                w={'75px'}
                                h={'75px'}
                                alignItems={'center'}
                                m={'10px 0 0 0'}

                            />
                            <Text
                                fontSize={"12px"}
                                textAlign={'center'}
                            >
                                유저이름
                            </Text>

                        </Box>

                        <Box
                            w={'50px'}
                        >
                            <Image
                                src={weather10_Moning}
                                w={'50px'}
                                h={'50px'}
                                alignItems={'center'}
                                m={'10px 0 0 0'}

                            />
                            <Text
                                fontSize={"12px"}
                                textAlign={'center'}
                            >
                                유저이름
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
                            >
                                유저닉네임
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
                                내 캘린더 순위
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
                                        src={weather10_Moning}
                                        w={'50px'}
                                        alignItems={'center'}
                                    >
                                    </Image>
                                    <Text
                                        fontSize={"10px"}
                                        color={'white'}
                                    >
                                        유저닉네임
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
                                        3등
                                    </Text>
                                    <Image
                                        src={weather10_Moning}
                                        w={'50px'}
                                        alignItems={'center'}
                                    >
                                    </Image>
                                    <Text
                                        fontSize={"10px"}
                                        color={'white'}
                                    >
                                        유저닉네임
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
                                        src={weather10_Moning}
                                        w={'50px'}
                                        alignItems={'center'}
                                    >
                                    </Image>
                                    <Text
                                        fontSize={"10px"}
                                        color={'white'}
                                    >
                                        유저닉네임
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
                         MY PAGE
                    </Button>

                    <Button
                        bg={'#3b3b3b'}
                        color={'white'}
                        fontSize={'14px'}
                        w={"100px"}
                        name={"event"}
                        onClick={onClick}
                    >
                        EVENT
                        <FaCaretRight />
                    </Button>


                </HStack>




            </VStack>
        )
}
