import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </ChakraProvider>
);
