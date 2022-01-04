
const express = require('express');
const hometax = require('../modules/hometax')
const sliceFunc = require('../publicJs/commonJS')
const router = express.Router();

const mainDir = 'C:\\Users\\user\\Desktop\\HometaxScrapping'

var name = "";
// http://localhost:3000/ Get요청했을때 처리후 응답


router.post("/hometax",async function(req, res){

    var userName=   base64Encoding(req.body.userName);
    var userPhone=  base64Encoding(req.body.phoneNum);
    var userSsn1=   base64Encoding(req.body.ssn1);
    var userSsn2=   base64Encoding(req.body.ssn2);
    name = req.body.userName;
    var result = await hometax.prototype.login(userName, userPhone, userSsn1,userSsn2, name);

    console.log("main : "+ result);
    if(result == "OK"){
        res.sendFile(mainDir+"/public/html/responsing.html");
    }

});

router.post("/okResponse",async function(req, res){

    console.log("홈택스 로그인 완료");

    var result =await hometax.prototype.소득조회();
  
    var earnedIncome = sliceFunc(result, "<erinSumAmt>", "</erinSumAmt>");
    var finIncome = sliceFunc(result, "<cfinSumAmt>", "</cfinSumAmt>");

    console.log("'"+name+"'님의 근로소득은  '"+earnedIncome+"'입니다.")
    console.log("'"+name+"'님의 금융소득은  '"+finIncome+"'입니다.")

    let jsonRes = {
        "근로소득": earnedIncome,
        "금융소득":finIncome
    }

    res.json(jsonRes);


});




function base64Encoding(text){
    var base64EncodedText = Buffer.from(text,"utf8").toString('base64');
    return base64EncodedText;
}

function base64Decoding(base64EncodedText){
    var text = Buffer.from(base64EncodedText,"base64").toString('utf8');
    return text;
}

module.exports = router;