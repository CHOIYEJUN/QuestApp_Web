

export const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const fixedMonth = month < 10 ? "0" + month : month;
    const fixedDate = date < 10 ? "0" + date : date;
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const todayString = year + "-" + fixedMonth + "-" + fixedDate;


    return todayString;
}
