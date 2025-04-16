//CALLBACK
// function getData(data, callbackTwo) {
//     setTimeout(() => {
//         console.log("data----", data);
//         if (callbackTwo)
//             callbackTwo();
//     }, 2000)
// }
// getData(1, () => {
//     console.log("getting data2 ----");
//     getData(2, () => {
//         console.log("getting data3 ----");
//         getData(3);
//     });
// });


//PROMISES
// function getData1(data) {
//     return new Promise((resolve, rject) => {
//         setTimeout(() => {
//             console.log("data1 fetching");
//             resolve(`Success ${data}`);
//         }, 2000);
//     });

// }
// function getData2(data) {
//     return new Promise((resolve, rject) => {
//         setTimeout(() => {
//             console.log("data2 fetching");
//             resolve(`Success ${data}`);
//         }, 2000);
//     });

// }
// let promise = getData1(123);
// promise.then((res) => {
//     console.log("data1----", res);
//     let promise1 = getData2(12345);
//     promise1.then((res2) => { console.log("data2----", res2); });
// });
//prmoise chain
// promise.then((res) => {
//     console.log("data1----", res);
//     return getData2(12345);
// }).then((res) => { console.log("data2----", res); });


//async/await
// function getData1(data) {
//     return new Promise((resolve, rject) => {
//         setTimeout(() => {
//             console.log("data1 fetching");
//             resolve(`Success ${data}`);
//         }, 2000);
//     });

// }


// (async function () {
//     await getData1(135);
//     await getData1(1332235);
//     await getData1(1387885);
// })();

// const file = require("./math");
// let sum = file(2, 3);
// console.log("sum----", sum);

import add   from "./math.js"
console.log(add(2, 3));  

