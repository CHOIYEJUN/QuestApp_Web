import {
    Box, Button,
    Img, useToast,

} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function EventButton() {
    const toast = useToast();
    const onclick = (e) => {
        toast({
            title: "서비스 준비중입니다.",
            status: "warning",
            duration: 2000,
            isClosable: true,
        })

    }

    return(
            <>
                <Box
                    cursor={'pointer'}
                    w={'50px'}
                    onClick={onclick}
                >
                    <Img
                        src={'https://firebasestorage.googleapis.com/v0/b/mintonmap-7f2e8.appspot.com/o/TodayDoneImg%2FeventBtn.png?alt=media&token=ad07d45d-0b4f-4bd3-89e5-8f5d54df8e0f'}
                    />
                </Box>

            </>
    )
}
