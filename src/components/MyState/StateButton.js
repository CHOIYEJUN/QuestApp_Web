import {Box, Img} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function StateButton() {
    const navigation = useNavigate();
    const onclick = (e) => {
        navigation("/");
    }

    return(

        <Box
            cursor={'pointer'}
            w={'50px'}
        >
            <Img
                src={'https://firebasestorage.googleapis.com/v0/b/mintonmap-7f2e8.appspot.com/o/TodayDoneImg%2FstateBtn.png?alt=media&token=b032bef7-63b3-4682-beb6-61a3039d9cf5'}
                onclick={onclick}
            />
        </Box>
    )
}
