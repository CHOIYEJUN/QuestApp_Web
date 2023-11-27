import axios from 'axios';

const url = 'http://localhost:9095/Diary/';
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const week = ['일', '월', '화', '수', '목', '금', '토'];
const todayString = year + "-" + month + "-" + date;
const phone = window.localStorage.getItem("user_phone");


export const getStemp = async () => {
    try {
        const response = await axios.get(url + 'getStempData', {
            params: {
                phone: phone,
            },
            headers: {
                "Content-Type": `application/json;charset=UTF-8`,
                "Accept": "application/json",
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow-Credentials': "true",
            }
        });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return "fail";
    }
}

export const insertStemp = async () => {

    try {
        const response = await axios.get(url + 'insertStempData', {
            params: {
                phone: phone,
                quest_date: todayString,
                quest_status : "excellent"
            },
            headers: {
                "Content-Type": `application/json;charset=UTF-8`,
                "Accept": "application/json",
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow-Credentials': "true",
            }
        });

        if(response.data.RESTEMP) {
            return "already";
        }
        return "success";
    }
    catch (error) {
        console.log(error);
        return "fail";
    }

}

export const insertCheckOtherDay = async (item) => {
    try {
        const response = await axios.get(url + 'insertCheckOtherDay', {
            params: {
                phone: phone,
                quest_date: item.start,
                quest_status : "good"
            },
            headers: {
                "Content-Type": `application/json;charset=UTF-8`,
                "Accept": "application/json",
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow-Credentials': "true",
            }
        });
        console.log(response.data);
        return "success";
    }
    catch (error) {
        console.log(error);
        return "fail";
    }
}

export const deleteStemp = async (item) => {
    try {
        const response = await axios.get(url + 'deleteStemp', {
            params: {
                phone: phone,
                quest_date: item
            },
            headers: {
                "Content-Type": `application/json;charset=UTF-8`,
                "Accept": "application/json",
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow-Credentials': "true",
            }
        });
        console.log(response.data);
        return "success";
    }
    catch (error) {
        console.log(error);
        return "fail";
    }

}
