import {
    Box, Button,
    Img,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {auth} from "../../fireBase";

export default function MyPageButton() {
    const navigation = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const onclick = (e) => {
       onOpen();

    }
    const onLogout = async () => {
            localStorage.clear();
            await auth.signOut();
            navigation("/login");
    }

    return(
        <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>마이페이지</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Button colorScheme='red' mr={3} onClick={onLogout}>
                                로그아웃
                            </Button>


                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Box
                    cursor={'pointer'}
                    w={'50px'}
                >
                    <Img
                        src={'https://firebasestorage.googleapis.com/v0/b/mintonmap-7f2e8.appspot.com/o/TodayDoneImg%2FmyPageBtn.png?alt=media&token=8eec2077-8324-4d8f-bde5-3096a62e02dd'}
                        onClick={onclick}
                    />
                </Box>
        </>
    )
}
