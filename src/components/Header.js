import {Box, Center, Text} from "@chakra-ui/react";
import { useNavigate} from "react-router-dom";

export default function Header() {
    const userName = localStorage.getItem("user_name");
    const navigation = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigation("/login");
    }

    return(
        <>
            <Box
                bg={'#F2F2F2'}
                w={'100%'}
                p={'10px 0 10px 0'}
            >
                <Center>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                    >
                        {userName}님
                    </Text>
                    <Text
                        fontSize={'l'}
                        fontWeght={'bold'}
                        onClick={onLogout}

                    >
                        로그아웃
                    </Text>
                </Center>
            </Box>
        </>
    )
}
