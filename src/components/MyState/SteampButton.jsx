import {Box, Img} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function SteampButton() {
    const navigation = useNavigate();
    const onclick = (e) => {
        navigation("/");
    }

    return(

        <Box
            cursor={'pointer'}
            w={'50px'}
            onClick={onclick}
        >
            <Img
                src={'https://firebasestorage.googleapis.com/v0/b/mintonmap-7f2e8.appspot.com/o/TodayDoneImg%2FstempBtn.png?alt=media&token=599ffb2e-58d1-4cb6-886c-7f4f7029462b'}
            />
        </Box>
    )
}
