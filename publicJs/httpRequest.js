const axios = require('axios');

var httpRequest = function(){
    var result = ""; 
}

//통신결과를 true/false로 할지 통신에 대한 응답값으로 할지 고민중
httpRequest.prototype.get = async function(url, header){

    if(header == undefined){
        header = {};
    }else{
        header = JSON.parse(header);
    }

    if(JSON.stringify(header).indexOf("Content-Length")>-1){
        console.log("[Error] Content-Length in header" )
    }
   
   
    console.log("Get Function")
    try{

        this.result = await axios({
            method: 'get',
            url: url,
            headers:header
        });

    }catch(e){
        console.log("Get Error ")
        return false;
    }

    return true;
    
}

httpRequest.prototype.post = async function(path, postData, header){
  // header = JSON.parse(header);
  console.log("POST Function path: "+path);
  // console.log(url);
  // console.log(postData);
  // console.log(header);
  if(header.indexOf("Content-Length")>-1){
      console.log("[Error] Content-Length in header" )
  }
  if(header == undefined){
      header = {};
  }
  header = JSON.parse(header)
  
  try{
      console.log("try init");
        this.result = await axios({
            method: 'post',
            url: path,
            data:postData,
            rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
            headers:header
        });
  // console.log(this.result)
  }catch(e){
      console.log("post error!")
      console.log(e.message)
      return false;
  }

  if(this.result['data'] == undefined){
      console.log("this.result['data'] is undefinded");
  }
  return true;
}
httpRequest.prototype.getResult = async function(){
    console.log("getResult Function");
    // console.log(this.result['data']);
    return this.result['data'];
}
httpRequest.prototype.getCookie =  async function(){

    var cookie = "";
    try{
        var cookieArr = this.result.headers["set-cookie"];
        
        for(var i=0; i<cookieArr.length; i++){
             if(cookieArr[i].indexOf(";")>-1){
                 cookie +=cookieArr[i].substring(0,cookieArr[i].indexOf(";"))+"; "
             }else{
                 cookie += cookieArr[i]+"; ";
             }
         } 
    
    }catch{
        console.log("no set-cookie! ");

    }    
        
    return cookie;
}

// class httpRequest{
//     result = "";
    
//     constructor(){
        
//     }

//      async get(url, header){
//         if(header == undefined){
//             header = {};
//         }else{
//             header = JSON.parse(header);
//         }

//         if(JSON.stringify(header).indexOf("Content-Length")>-1){
//             console.log("[Error] Content-Length in header" )
//         }
       
       
//         console.log("Get Function")
        
//         this.result = await axios({
//             method: 'get',
//             url: url,
//             headers:header
//         });
        
//         return this.result['data'];
        
//     }

//     async post(path, postData, header){
//         // header = JSON.parse(header);
//         console.log("POST Function path: "+path);
//         // console.log(url);
//         // console.log(postData);
//         // console.log(header);
//         if(header.indexOf("Content-Length")>-1){
//             console.log("[Error] Content-Length in header" )
//         }
//         if(header == undefined){
//             header = {};
//         }
//         header = JSON.parse(header)
        
//         try{
//             console.log("try init")
//        this.result = await axios({
//             method: 'post',
//             url: path,
//             data:postData,
//             rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
//             headers:header
//         });
//         // console.log(this.result)
//         }catch(e){
//             console.log("post error!")
//             console.log(e.message)
//         }

//         if(this.result['data'] == undefined){
//             console.log("this.result['data'] is undefinded");
//         }

//         return this.result['data'];
//     }


//     async getCookie(){

//         var cookie = "";
//         try{
//             var cookieArr = this.result.headers["set-cookie"];
            
//             for(var i=0; i<cookieArr.length; i++){
//                  if(cookieArr[i].indexOf(";")>-1){
//                      cookie +=cookieArr[i].substring(0,cookieArr[i].indexOf(";"))+"; "
//                  }else{
//                      cookie += cookieArr[i]+"; ";
//                  }
//              } 
        
//         }catch{
//             console.log("no set-cookie! ");

//         }    
            
//         return cookie;
//     }

// }


module.exports = httpRequest