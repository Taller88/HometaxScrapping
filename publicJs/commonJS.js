// 공용 함수 


/*
    문자열 자르는 함수
    text - 문자열 
    to - 시작 문자열(포함 X)
    from - 끝 문자열(포함 X)
    return : 잘린 문자열 
*/
function sliceFunc(text, to, from){

    var result = text.substring(text.indexOf(to)+to.length,text.length);

    result = result.substring(0,result.indexOf(from));
    
//NTS_LOGIN_SYSTEM_CODE_P=TXPP;Domain=hometax.go.kr;Path=/,TXPPsessionID=ioyt0FdX69nxwFhLnSjLkszKFEyBaCRuOOEDpzL5XJEyyrVjpjuOIP7FYcOvO1XZ.tupiwsp28_servlet_TXPP01;Domain=.hometax.go.kr;Path=/

    return result;
}





module.exports = sliceFunc;