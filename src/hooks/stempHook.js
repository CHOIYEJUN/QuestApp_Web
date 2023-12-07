import axios from 'axios';

const url = 'http://13.209.21.173:9095/Diary/';
const allowOrigin = 'https://dailyquest-a912d.web.app/';
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
//만약 date 가 한자리 라면 앞에 0 붙혀줘야 함
//ex) 2021-04-1 -> 2021-04-01 로 바꿔줘야 함
const fixedDate = date < 10 ? "0" + date : date;
const week = ['일', '월', '화', '수', '목', '금', '토'];
const todayString = year + "-" + month + "-" + fixedDate;
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
                "Access-Control-Allow-Origin": allowOrigin,
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
                "Access-Control-Allow-Origin": allowOrigin,
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
                "Access-Control-Allow-Origin": allowOrigin,
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
                "Access-Control-Allow-Origin": allowOrigin,
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
