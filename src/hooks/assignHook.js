import axios from 'axios';

const url = 'http://13.209.21.173:9095/Diary/';
const allowOrigin = 'https://dailyquest-a912d.web.app/';
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
                "Access-Control-Allow-Origin": allowOrigin,
                'Access-Control-Allow-Credentials': "true",
            }
        });

        window.localStorage.setItem("user_phone", response.data.RESULT[0].phone);
        window.localStorage.setItem("user_name", response.data.RESULT[0].user_name);
        window.localStorage.setItem("user_belong", response.data.RESULT[0].belong);
        window.localStorage.setItem("user_start_date", response.data.RESULT[0].start_date);
        console.log(response.data);

        return "success";
    } catch (error) {
        console.log(error);

        return "fail";
    }
};

export const assignUpHook = async (username, phone, password, belong) => {
    try {
        const response = await axios.get(url + 'insartAssignData', {
            params: {
                user_name: username,
                phone: phone,
                password: password,
                belong: belong,
            },
            headers: {
                "Content-Type": `application/json;charset=UTF-8`,
                "Accept": "application/json",
                "Access-Control-Allow-Origin": allowOrigin,
                'Access-Control-Allow-Credentials': "true",
            }
        });
        console.log(response.data);
    }
    catch (error) {
        console.log(error);
    }
};


export const checkPhone = async (phone) => {
    try {
        const response = await axios.get(url + 'checkPhoneNumber', {
            params: {
                phone: phone,
            },
            headers: {
                "Content-Type": `application/json;charset=UTF-8`,
                "Accept": "application/json",
                "Access-Control-Allow-Origin": allowOrigin,
                'Access-Control-Allow-Credentials': "true",
            }
        });
        console.log(response.data.SUCCESS);
        return response.data.SUCCESS;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
