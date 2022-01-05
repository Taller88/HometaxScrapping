const axios = require('axios');
const httpRequest = require('../publicJs/httpRequest');
const sliceFunc = require('../publicJs/commonJS')
var hometax = function(){
    var result = "";
    var reqTxTest = "";
    var cookieValue = "";
}

hometax.prototype.login = async function(userName, userPhone,userSsn1,userSsn2, name){
    console.log("param check userName: "+userName+ " userPhone: "+userPhone);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    var path = "/gpin/v1/request_tx"

    try{
        
        var result = await axios({
            method: 'post',
            url: "https://www.hometax.go.kr/gpin/v1/request_tx",
            data:{
                params:{
                    signTarget:''
                }
            }
        });

        console.log("reqTxId: "+ result.data.reqTxId);

        var reqTxId = result.data.reqTxId;
        this.reqTxTest = reqTxId;
        var postData = "reqTxId="+reqTxId+"&popupType=layer&userType=R&ssn=&userName=";

        var result = await axios({
            method: 'post',
            url: "https://www.hometax.go.kr/gpin/easy-login",
            data:postData,
            headers:{
                'Host' : 'www.hometax.go.kr',
                'Connection' : 'keep-alive',
                'Cache-Control' : 'max-age=0',
                'sec-ch-ua' : '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
                'sec-ch-ua-mobile' : '?0',
                'sec-ch-ua-platform' : '"Windows"',
                'Upgrade-Insecure-Requests' : '1',
                'Origin' : 'https://www.hometax.go.kr',
                'Content-Type' : 'application/x-www-form-urlencoded',
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
                'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Sec-Fetch-Site' : 'same-origin',
                'Sec-Fetch-Mode' : 'navigate',
                'Sec-Fetch-Dest' : 'iframe',
                // 'Referer' : "https://www.hometax.go.kr/websquare/popup.html?w2xPath=/ui/comm/a/d/UTECMADA02.xml&layerPopup=Y&popupID=UTECMADA02&w2xHome=/ui/pp/&'w2xDocumentRoot=",
                'Accept-Encoding' : 'gzip, deflate, br',
                'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        });

        var cookieArr = result.headers["set-cookie"];
        var cookie = "";
        for(var i=0; i<cookieArr.length; i++){
            cookie += cookieArr[i];
        }
        console.log("cookie: "+ cookie);
        this.cookieValue = cookie;
        var path = "https://www.hometax.go.kr/gpin/v1/certification/notice?reqTxId="+reqTxId;


        var postData = '{"idn":"","userInfo":{"isMember":false,"name":"'+userName+'","phoneNumber":"'+userPhone+'","ssn1":"'+userSsn1+'","ssn2":"'+userSsn2+'","birthday":"","privacy":"1","terms":"1","policy3":"1","policy4":"1"},"provider":"kakao"}'

        // 모바일로 요청
        var result = await axios({
            method: 'post',
            url: "https://www.hometax.go.kr/gpin/v1/certification/notice?reqTxId="+reqTxId,
            data:postData,
            headers:{
                'Connection' : 'keep-alive'
                ,'sec-ch-ua' : ' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'sec-ch-ua-mobile' : ' ?0'
                ,'User-Agent' : ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform' : ' "Windows"'
                ,'Content-type' : 'application/json'
                ,'Accept' : '*/*'
                ,'Origin' : 'https://www.hometax.go.kr'
                ,'Sec-Fetch-Site' : 'same-origin'
                ,'Sec-Fetch-Mode' : 'cors'
                ,'Sec-Fetch-Dest' : 'empty'
                ,'Referer' : 'https://www.hometax.go.kr/gpin/easy-login'
                ,'Accept-Encoding' : 'gzip, deflate, br'
                ,'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                ,'Cookie' : cookie
            }
        });

        console.log("***result:"+ result.data.resultCode);
        return result.data.resultCode ;

    }catch(error){
        console.log(error);
    }
}



hometax.prototype.소득조회 = async function(){
    var host = "https://www.hometax.go.kr";
    console.log("소득 조회 init")
    console.log("this.reqTxTest: "+this.reqTxTest)

    var postData = '{"reqTxId":"'+this.reqTxTest+'","userNm":"user_name","provider":"kakao"}';
    try{
        
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
    var result = await axios({
      method: 'post', 
      url: "https://www.hometax.go.kr/gpin/v1/certification/notice/result",
      data:postData,
      rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
      headers:{
          'Host' : ' www.hometax.go.kr'
          ,'Connection' : ' keep-alive'
          ,'sec-ch-ua' : ' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
          ,'sec-ch-ua-mobile' : ' ?0'
          ,'User-Agent' : ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
          ,'sec-ch-ua-platform' : ' "Windows"'
          ,'Content-type' : ' application/json'
          ,'Accept' : '*/*'
          ,'Origin' : 'https://www.hometax.go.kr'
          ,'Sec-Fetch-Site' : ' same-origin'
          ,'Sec-Fetch-Mode' : ' cors'
          ,'Sec-Fetch-Dest' : ' empty'
          ,'Referer' : ' https://www.hometax.go.kr/gpin/easy-login'
          ,'Accept-Encoding' : ' gzip, deflate, br'
          ,'Accept-Language' : ' ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
          ,'Cookie' : this.cookieValue
      }
    });

    console.log("[gpin/v1/certification/notice/result]:"+ result.data.resultCode);

    postData = 'moisCertYn=Y&reqTxId='+this.reqTxTest+'&ssoStatus=&portalStatus=&scrnId=UTXPPABA01&userScrnRslnXcCnt=1920&userScrnRslnYcCnt=1080'
    result = await axios({
        method: 'post',
        url: "https://www.hometax.go.kr/pubcLogin.do?domain=hometax.go.kr&mainSys=Y",
        data:postData,
        rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
        headers:{
            'Host' : ' www.hometax.go.kr'
            ,'Connection' : ' keep-alive'
            ,'sec-ch-ua' : ' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
            ,'Accept' : ' text/plain, */*; q=0.01'
            ,'Content-Type' : ' application/x-www-form-urlencoded; charset=UTF-8'
            ,'X-Requested-With' : ' XMLHttpRequest'
            ,'sec-ch-ua-mobile' : ' ?0'
            ,'User-Agent' : ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            ,'sec-ch-ua-platform' : ' "Windows"'
            ,'Origin' : ' https://www.hometax.go.kr'
            ,'Sec-Fetch-Site' : ' same-origin'
            ,'Sec-Fetch-Mode' : ' cors'
            ,'Sec-Fetch-Dest' : ' empty'
            ,'Referer' : ' https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot='
            ,'Accept-Encoding' : ' gzip, deflate, br'
            ,'Accept-Language' : ' ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
            ,'Cookie' : this.cookieValue
        }
    }); 
 
    console.log("[/pubcLogin.do?domain=hometax.go.kr&mainSys=Y] result: "+ result.data.toString());
    var tin = sliceFunc(result.data.toString(), "'tin' : '", "',");
    // tin = tin.substring(tin.indexOf("' : '")+5, tin.length);

    console.log("tin: "+ tin);

    console.log("set - cookie: "+result.headers["set-cookie"]);
    var addedCookie = result.headers["set-cookie"].toString();
    var txppSessionID = "TXPPsessionID="+sliceFunc(addedCookie, "TXPPsessionID=", ";");
    // var  = sliceFunc(addedCookie, "TXPPsessionID=", ";");
    
    this.cookieValue += this.cookieValue+";"+txppSessionID+";NTS_LOGIN_SYSTEM_CODE_P=TXPP;";

    console.log("cookieVal: "+ this.cookieValue)
    postData = "<map id='postParam'><popupYn></popupYn></map>"
    // 홈텍스는 쿠키값 영향 많이 받음
    result = await axios({
        method: 'post',
        url: "https://www.hometax.go.kr/permission.do?screenId=UTXPPABA01",
        data:postData,
        rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
        headers:{
            'Host' : ' www.hometax.go.kr'
            ,'Connection' : ' keep-alive'
            ,'sec-ch-ua' : ' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
            ,'Accept' : ' application/xml; charset=UTF-8'
            ,'Content-Type' : ' application/xml; charset=UTF-8'
            ,'sec-ch-ua-mobile' : '?0'
            ,'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            ,'sec-ch-ua-platform' : '"Windows"'
            ,'Origin' : 'https://www.hometax.go.kr'
            ,'Sec-Fetch-Site' : 'same-origin'
            ,'Sec-Fetch-Mode' : 'cors'
            ,'Sec-Fetch-Dest' : 'empty'
            ,'Referer' : 'https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot='
            ,'Accept-Encoding' : 'gzip, deflate, br'
            ,'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
            ,'Cookie' : this.cookieValue
        }
    });
    console.log("[/permission.do?screenId=UTXPPABA01] result: "+ result.data);
    
        var path = "https://tewf.hometax.go.kr/permission.do?screenId=UTEWFCBA01";
        postData = "<map id='postParam'><popupYn>false</popupYn></map>";

        result = await axios({
            method: 'post',
            url: path,
            data:postData,
            rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
            headers:{
                'Host':'tewf.hometax.go.kr'
                ,'Connection':'keep-alive'
                ,'sec-ch-ua':'"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'Accept':'application/xml; charset=UTF-8'
                ,'Content-Type':'application/xml; charset=UTF-8'
                ,'sec-ch-ua-mobile':'?0'
                ,'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform':'"Windows"'
                ,'Origin':' https://tewf.hometax.go.kr'
                ,'Sec-Fetch-Site':'same-origin'
                ,'Sec-Fetch-Mode':'cors'
                ,'Sec-Fetch-Dest':'empty'
                ,'Referer':' https://tewf.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/wf/c/b/a/UTEWFCBA01.xml'
                ,'Accept-Encoding':' gzip, deflate, br'
                ,'Accept-Language':' ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'                  
                ,'Cookie' : this.cookieValue
            }
        });
        console.log("Cookie: "+result.headers["set-cookie"])

        path = "https://hometax.go.kr/token.do?query=_kNBFP3DaqbMPKU7lHtcW&postfix="+new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate() ;
        this.cookieValue += result.headers["set-cookie"]+";NTS_REQUEST_SYSTEM_CODE_P=TXPP; "
        result = await axios({
            method: 'get',
            url: path,
            rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
            headers:{
                'Host': 'hometax.go.kr'
                ,'Connection':' keep-alive'
                ,'sec-ch-ua':' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'sec-ch-ua-mobile':' ?0'
                ,'User-Agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform':' "Windows"'
                ,'Accept':' */*'
                ,'Sec-Fetch-Site':' same-site'
                ,'Sec-Fetch-Mode':' no-cors'
                ,'Sec-Fetch-Dest':' script'
                ,'Referer':' https://tewf.hometax.go.kr/'
                ,'Accept-Encoding':' gzip, deflate, br'
                ,'Accept-Language':' ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'                    
                ,'Cookie' : this.cookieValue
            }
        });
        console.log("Cookie: "+result.headers["set-cookie"])
        this.cookieValue += this.cookieValue + result.headers["set-cookie"];
        console.log(sliceFunc(result.data, 'nts_reqPortalCallback("', '");'));
        postData = "<map id='postParam'>"+ sliceFunc(result.data, 'nts_reqPortalCallback("', '");')+ "<popupYn>false</popupYn></map>";
        console.log("********postData: "+postData);
        path = "https://tewf.hometax.go.kr/permission.do?screenId=UTEWFCBA01&domain=hometax.go.kr"
        result = await axios({
            method: 'post',
            url: path,
            data:postData,
            rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
            headers:{
                'Host':'tewf.hometax.go.kr'
                ,'Connection':'keep-alive'
                ,'sec-ch-ua':'"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'Accept':'application/xml; charset=UTF-8'
                ,'Content-Type':'application/xml; charset=UTF-8'
                ,'sec-ch-ua-mobile':'?0'
                ,'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform':'"Windows"'
                ,'Origin':'https://tewf.hometax.go.kr'
                ,'Sec-Fetch-Site':'same-origin'
                ,'Sec-Fetch-Mode':'cors'
                ,'Sec-Fetch-Dest':'empty'
                ,'Referer':'https://tewf.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/wf/c/b/a/UTEWFCBA01.xml'
                ,'Accept-Encoding':'gzip, deflate, br'
                ,'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                ,'Cookie' : this.cookieValue
            }
        });
        cookieArr = result.headers["set-cookie"];
        for(var i =0 ; i<cookieArr.length; i++){
            console.log('cookieArr[i]: '+ cookieArr[i])
            this.cookieValue += cookieArr[i]+";"
        }

        console.log("==================================================================")
        console.log("result: "+ result.data);
        console.log("==================================================================")



        path = "https://tewf.hometax.go.kr/websquare//serverTime.wq?pattern=yyyy&idx=16372956765148950.479635401685";
        postData = '';
        result = await axios({
            method: 'post',
            url: path,
            data:postData,
            rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
            headers:{
                'Host':'tewf.hometax.go.kr'
                ,'Connection':'keep-alive'
                ,'Content-Length':'0'
                ,'sec-ch-ua':'"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'sec-ch-ua-mobile':'?0'
                ,'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform':'"Windows"'
                ,'Accept':'*/*'
                ,'Origin':'https://tewf.hometax.go.kr'
                ,'Sec-Fetch-Site':'same-origin'
                ,'Sec-Fetch-Mode':'cors'
                ,'Sec-Fetch-Dest':'empty'
                ,'Referer':'https://tewf.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/wf/c/b/a/UTEWFCBA01.xml'
                ,'Accept-Encoding':'gzip, deflate, br'
                ,'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                ,'Cookie' : this.cookieValue
            }
        });


       
        path = "https://tewf.hometax.go.kr/wqAction.do?actionId=ATEWFCBA001R01&screenId=UTEWFCBA01&popupYn=false&realScreenId=";
        // postData = '<map id="ATEWFCBA001R01"><map id="searchVO"><attrYr>2020</attrYr><tin>'+tin+'</tin></map></map><nts<nts>nts>27K0k0P9LivozZcfQAGYkO0DgVsaOUlN42nQdHceIs16';
        postData = '<map id="ATEWFCBA001R01"><map id="searchVO"><attrYr>2020</attrYr><tin>'+tin+'</tin></map></map>';
        console.log(postData);
        console.log("******cookieVal: "+ this.cookieValue);
        result = await axios({
            method: 'post',
            url: path,
            data:postData,
            rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
            headers:{
                'Host':'tewf.hometax.go.kr'
                ,'Connection':'keep-alive'
                ,'sec-ch-ua':'"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'Accept':'application/xml; charset=UTF-8'
                ,'Content-Type':'application/xml; charset=UTF-8'
                ,'sec-ch-ua-mobile':'?0'
                ,'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform':'"Windows"'
                ,'Origin':'https://tewf.hometax.go.kr'
                ,'Sec-Fetch-Site':'same-origin'
                ,'Sec-Fetch-Mode':'cors'
                ,'Sec-Fetch-Dest':'empty'
                ,'Referer':'https://tewf.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/wf/c/b/a/UTEWFCBA01.xml'
                ,'Accept-Encoding':'gzip, deflate, br'
                ,'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                ,'Cookie' : this.cookieValue
            }
        });

        console.log("==================================================================")
        console.log("result: "+ result.data);
        console.log("==================================================================")

        return result.data.toString();
    

    
    }catch(error){
        console.log("***gpin/v1/certification/notice/result Error!!")
        console.log(error);
    }

};

module.exports = hometax;