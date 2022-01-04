# HometaxScrapping
  홈택스 스크래핑 repository입니다.

![image](https://user-images.githubusercontent.com/48818574/148074686-cf22180e-9cd4-4242-98e7-ceb0cf17cbc9.png)

***

## 프로젝트 소개 
    nodeJS를 활용하여 홈텍스 근로, 금융소득을 스크래핑하여 json으로 전달하는 프로젝트입니다. 
    
  1. 웹에서 입력 
  2. 간편인증(카카오) 전달 - response 인증 대기페이지 
  3. 2021 근로, 금융소득 json전달

## 프로젝트 구조 

  📁 modules
  
   - 스크래핑 모듈 저장 디렉토리
   
  📁 node_modules
  
   - npm install 을 통해 저장한 JS가 저장된 디렉토리
    
  📁 public
  
   - html,css, js와 같은 static 파일 저장 디렉토리
   
  📁 publicJS
  
   - 스크래핑에 필요한 함수나 클래스 저장파일
   
  📁 routes
  
   - URL routing할 때 사용한 JS저장 디렉토리


  💾 index.js 
  
   - app.js 와 동일 파일 
   - Server open, / urlhosting, 
  

## 사용모듈


   * express 모듈 
        - 웹과 관련된 기능을 제공하는 모듈 
        - 웹서버오픈, URL Routing..


   * axios모듈 -> 스크래핑 할 때 사용
        - 비동기로 동작하는 통신 모듈 
        - get, post로 다른 서버에 Request를 보내고 Response를 받아옵니다. 
        - 비동기로 동작하기 때문에 async, await 과 같은 명령어를 통해 동기로 동작하도록 사용했습니다. 
        - 설치 명령어 : npm install axios --save


  * jest 모듈
    - nodeJS 테스트 프레임워크 (mocha모듈도 있습니다.)
    - 아직 제대로 사용해보지 않아서 익숙하진 않지만 예상하는 결과값을 미리 정해놓고 결과가 일치하는지 체크할 때 사용하고 있습니다. 
    - 설치 명령어 : npm install jest --save


  * nodemon 모듈 
    - 프로젝트를 실행시킬 때 사용하는 모듈 
    - 프로젝트에서 변경한 내용을 저장하면 자동으로 재시작해주는 기능제공 
    - 설치 명령어 : npm install nodemon --save 

