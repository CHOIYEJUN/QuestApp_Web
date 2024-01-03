import {Button, Text, useToast, VStack} from "@chakra-ui/react";
import {Calendar} from "../components/Admin/calendar";
import React, {forwardRef, useRef, useState} from "react";
import {insertCheckAdminDay, insertCheckOtherDay} from "../hooks/stempHook";

export default function Admin(){

    const childComponentRef = useRef();
    const toster = useToast();
    const [refresh, setRefresh] = useState(false);
    const onClick =  (e) => {
        const childValue = childComponentRef.current.getChildValue();
        const buttonName = e.target.name;
        if(childValue.length === 0) {
            toster({
                title: "오류",
                description: "날짜를 선택해주세요.",
                status: "error",
                isClosable: true,
            })
            return;
        }
        postAdminStemp(childValue, buttonName);


    }

    const postAdminStemp = async (childValue, buttonName) => {
        try{
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

                } else if(insertCheckOtherDayState === "fail") {
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


        }catch (e) {
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

            </VStack>

        </>

    )

}
