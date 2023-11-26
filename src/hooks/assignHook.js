import axios from 'axios';

const url = 'http://localhost:9095/Diary/';
export const loginHook = async (phone, password) => {
    try {
        const response = await axios.get(url + 'getLoginData', {
            params: {
                phone: phone,
                password: password
            },
            headers: {
                "Content-Type": `application/json;charset=UTF-8`,
                "Accept": "application/json",
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow-Credentials': "true",
            }
        });

        window.localStorage.setItem("user_phone", response.data.RESULT[0].phone);
        window.localStorage.setItem("user_name", response.data.RESULT[0].user_name);
        console.log(response.data);

        return "success";
    } catch (error) {
        console.log(error);

        return "fail";
    }
};

export const assignUpHook = async (username, phone, password) => {
    try {
        const response = await axios.get(url + 'insartAssignData', {
            params: {
                user_name: username,
                phone: phone,
                password: password,
                belong: '-',
            },
            headers: {
                "Content-Type": `application/json;charset=UTF-8`,
                "Accept": "application/json",
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow-Credentials': "true",
            }
        });
        console.log(response.data);
    }
    catch (error) {
        console.log(error);
    }
};
