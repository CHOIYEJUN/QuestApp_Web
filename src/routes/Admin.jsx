import {Button, Text, useToast, VStack} from "@chakra-ui/react";
import {Calendar} from "../components/Admin/calendar";
import React, {useRef, useState} from "react";
import {insertCheckAdminDay} from "../hooks/stempHook";
import {runBibleReadsMigration, fetchStempAsJson} from "../hooks/bibleReadsHook";
import {bibleDate} from "../data/bibleSchedule";


export default function Admin(){

    const childComponentRef = useRef();
    const toster = useToast();
    const [migrating, setMigrating] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const onDownloadStempJson = async () => {
        setDownloading(true);
        try {
            const { raw } = await fetchStempAsJson();
            const blob = new Blob([JSON.stringify(raw, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `stemp-backup-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            toster({ title: "다운로드 완료", description: `stemp ${raw.length}건`, status: "success", isClosable: true });
        } catch (e) {
            toster({ title: "오류", description: "백업 다운로드 실패", status: "error", isClosable: true });
        }
        setDownloading(false);
    };

    const onMigrationClick = async () => {
        setMigrating(true);
        const { success, message } = await runBibleReadsMigration(bibleDate);
        setMigrating(false);
        toster({
            title: success ? "이관 완료" : "이관 실패",
            description: message,
            status: success ? "success" : "error",
            isClosable: true,
        });
    };

    const onClick = async (e) => {
        let childCheckData =  childComponentRef.current.getChildValue();


        const buttonName = e.target.name;
        if(childCheckData.length === 0) {
            toster({
                title: "오류",
                description: "날짜를 선택해주세요.",
                status: "error",
                isClosable: true,
            })
            return;
        }
        await postAdminStemp(childCheckData, buttonName);
        childCheckData = [];

    }

    const postAdminStemp = async (childValue, buttonName) => {
        try {
            const promises = childValue.map(
                (item) => {
                    item.status = buttonName;
                    item.isSend ? insertCheckAdminDay(item) : Promise.resolve()
                }
            );

            const results = await Promise.all(promises);

            results.forEach((insertCheckOtherDayState, index) => {
                if (insertCheckOtherDayState === "success") {
                    console.log("성공");

                } else if (insertCheckOtherDayState === "fail") {
                    toster({
                        title: "오류",
                        description: "관리자에게 문의바랍니다.",
                        status: "error",
                        isClosable: true,
                    })
                }
            });

            toster({
                title: "성공",
                description: "완료되었습니다.",
                status: "success",
                isClosable: true,
            })

            childComponentRef.current.refreshCalendar();

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <VStack
                margin={'30px 0 0 0'}
            >
                <Text
                    fontSize={'xl'}
                    fontWeight={'bold'}
                >
                    어드민 페이지
                </Text>

                <Calendar ref={childComponentRef}/>

                <Button
                    color={"white"}
                    bg={"green"}
                    name={"excellent"}
                    onClick={onClick}
                >
                    당일 완료
                </Button>

                <Button
                    color={"white"}
                    bg={"orange"}
                    name={"good"}
                    onClick={onClick}
                >
                    나중에 완료
                </Button>

                <Button
                    color={"white"}
                    bg={"gray"}
                    isLoading={downloading}
                    onClick={onDownloadStempJson}
                >
                    stemp 백업 JSON 다운로드
                </Button>

                <Button
                    color={"white"}
                    bg={"blue"}
                    isLoading={migrating}
                    onClick={onMigrationClick}
                >
                    성경 읽기 데이터 이관 (stemp → bibleReads, 1회)
                </Button>

            </VStack>

        </>

    )

}
