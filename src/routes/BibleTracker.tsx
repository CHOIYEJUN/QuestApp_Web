import React, { useState, useEffect } from "react";
import {Box, Grid, Button, Heading, Tooltip, VStack, Table, Td, Tr, Text, useToast} from "@chakra-ui/react";
import { getStemp } from "../hooks/stempHook";
import { bibleDate } from "../data/bibleSchedule";
import {useNavigate} from "react-router-dom";

interface ChapterStatus {
    [key: string]: boolean;
}

interface BibleData {
    no: number;
    book: string;
    chapter: string;
    date: string;
}


const flattenBibleData = () => {
    const flattenedData: BibleData[] = Object.entries(bibleDate).flatMap(
        ([date, entries]) =>
            entries.map((entry) => ({
                ...entry,
                date,
            }))
    );
    return flattenedData;
};

const BibleTracker = () => {
    const [bibleData, setBibleData] = useState<BibleData[]>([]);
    const [stempData, setStempData] = useState<string[]>([]);
    const [chapterStatus, setChapterStatus] = useState<ChapterStatus>({});

    const toster = useToast();

    const navigate = useNavigate();


    // 성경 데이터를 날짜, 장순으로 정렬하는 함수
    const sortBibleData = (bibleData: BibleData[]) => {
        const sortedBooks = bibleData
            .filter((item) => item.chapter === "1") // 각 책의 1장만 필터링
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const bookOrder = sortedBooks.map((item) => item.book);

        return [...bibleData].sort((a, b) => {
            const bookIndexA = bookOrder.indexOf(a.book);
            const bookIndexB = bookOrder.indexOf(b.book);

            if (bookIndexA !== bookIndexB) {
                return bookIndexA - bookIndexB;
            }
            return parseInt(a.chapter, 10) - parseInt(b.chapter, 10);
        });
    };

    // 출석 데이터 기반으로 읽음 상태 업데이트
    const updateChapterStatus = (completedDates: string[], sortedBibleData:any) => {
        const status: ChapterStatus = {};
        completedDates.forEach((date) => {
            sortedBibleData.forEach((entry) => {
                if (entry.date === date) {
                    status[`${entry.book}-${entry.chapter}`] = true;
                }
            });
        });
        setChapterStatus(status);
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const stempResult = await getStemp();

                if (Array.isArray(stempResult)) {
                    const flattenedBibleData = flattenBibleData();
                    const sortedBibleData = sortBibleData(flattenedBibleData);

                    setBibleData(sortedBibleData);

                    const completedChapters = stempResult.map((item) => item.quest_date);

                    setStempData(completedChapters);
                    updateChapterStatus(completedChapters, sortedBibleData);

                }
            } catch (e) {
                toster({
                    title: "오류",
                    description: "출석 데이터 불러오기에 실패했습니다.",
                    status: "error",
                    isClosable: true,
                })

                return
            }
        };
        fetchData();

    }, []);

    // 성경 데이터 그룹화
    const groupedByBook = bibleData.reduce((acc, curr) => {
        const { book } = curr;
        if (!acc[book]) {
            acc[book] = [];
        }
        acc[book].push(curr);
        return acc;
    }, {} as Record<string, BibleData[]>);

    return (
        <Box p={0}>
            <Button onClick={() => navigate(-1)}>{'< back'}</Button>
            <Heading mb={6} textAlign={'center'}>성경 출석표</Heading>
            <VStack align="start" spacing={8}>
                <Table margin={0} padding={0}>
                {Object.entries(groupedByBook).map(([book, chapters]) => (
                        <Tr key={book} border={'2px solid gainsboro'}>
                            <Td  margin={0} padding={0} backgroundColor={'blue.100'}>
                                <Text fontSize={'xs'} w={'50px'} textAlign={'center'}>
                                    {book}
                                </Text>
                            </Td>
                            <Td     padding={1}>
                                <Grid templateColumns="repeat(10, 1fr)" gap={1}>
                                    {chapters.map((entry) => (
                                        <Tooltip
                                            key={`${entry.book}-${entry.chapter}`}
                                            label={`${entry.date}`}
                                            hasArrow
                                        >
                                            <Button
                                                size="xs"
                                                borderRadius="full"

                                                bg={
                                                    chapterStatus[`${entry.book}-${entry.chapter}`]
                                                        ? "blue.400"
                                                        : "gray.200"
                                                }
                                                color={
                                                    chapterStatus[`${entry.book}-${entry.chapter}`]
                                                        ? "white"
                                                        : "black"
                                                }
                                                _hover={{
                                                    bg: chapterStatus[`${entry.book}-${entry.chapter}`]
                                                        ? "blue.500"
                                                        : "gray.300",
                                                }}
                                            >
                                                {entry.chapter}
                                            </Button>
                                        </Tooltip>
                                    ))}
                                </Grid>
                            </Td>
                        </Tr>
                ))}
                </Table>

            </VStack>
        </Box>
    );
};

export default BibleTracker;
