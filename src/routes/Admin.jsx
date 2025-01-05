import {Button, Text, useToast, VStack} from "@chakra-ui/react";
import {Calendar} from "../components/Admin/calendar";
import React, {forwardRef, useRef, useState} from "react";
import {insertCheckAdminDay, insertCheckOtherDay} from "../hooks/stempHook";
import bibleSchedule from '../data/bibleSchedule.json'
import {addDoc, collection} from "firebase/firestore";
import {DBservice} from "../fireBase";

export default function Admin(){

    const childComponentRef = useRef();
    const toster = useToast();

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

    const handleBibleDataClick = async  () => {


        const data = bibleSchedule?.bibleDate;
        try {
            // JSON 데이터를 순회하며 Firestore에 추가
            for (const date in data) {
                const entries = data[date];

                for (const entry of entries) {
                    const docData = {
                        date,
                        no: entry.no,
                        book: entry.book,
                        chapter: entry.chapter
                    };

                    // Firestore에 문서 추가
                    await addDoc(collection(DBservice, "bibleDate"), docData);
                    console.log(`Added ${entry.book} ${entry.chapter} on ${date}`);
                }
            }

            console.log("All data uploaded successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
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

               {/* <Button onClick={handleBibleDataClick}>
                    성경 데이터 넣기
                </Button>*/}

            </VStack>

        </>

    )

}
