
// var nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
// var nowDate2 = moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초');

// console.log(new Date());
// console.log(nowDate); // ISO Date
// console.log(nowDate2);

const moment = require('moment');

const nowDateIso = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

const nowDateKorean = () => {
    return moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초');
}

// 01. ES5
/* 
const obj = {
    moment : moment,
    nowDateIso : nowDateIso,
    nowDateKorean : nowDateKorean
}
module.exports = obj;
*/

// 02. ES6 : key 값과 value 값이 같다면, 생략가능!
/* 
const obj = {moment, nowDateIso, nowDateKorean}
module.exports = obj;
 */

// 03.
module.exports = {moment, nowDateIso, nowDateKorean};