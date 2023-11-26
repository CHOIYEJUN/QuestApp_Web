import {Box, Img} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function MyPageButton() {
    const navigation = useNavigate();
    const onclick = (e) => {
        navigation("/myPage");
    }

    return(

        <Box
            cursor={'pointer'}
            w={'50px'}
        >
            <Img
                src={'https://firebasestorage.googleapis.com/v0/b/mintonmap-7f2e8.appspot.com/o/TodayDoneImg%2FmyPageBtn.png?alt=media&token=8eec2077-8324-4d8f-bde5-3096a62e02dd'}
                onclick={onclick}
            />
        </Box>
    )
}
