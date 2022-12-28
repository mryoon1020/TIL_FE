import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
2022-12-23
powershell => node -v : nodejs 버전확인
powershell => npx : npx작동가능여부 확인(확인되면 exit으로 나오면됨)
powershell => clear : 터미널 clear
powershell => npx-create-react-app 프로젝트(앱)명 : react 프로젝트(앱)생성
powershell => npm start : react app 시작
powershell => npm i prop-types : react prop-types 설치
  설치 이후 prop-types를 사용할 위치에 import PropTypes from "prop-types"; 해주고 쓰면됨

import "./styles.css"; 할 경우 css 폴더 내용이
전체 태그에 영향을 주므로 이렇게 직접 사용하지 않음
Button.js 파일에서 사용되는 형태처럼 사용함
1. 파일명 변경(styles.css => Button.module.css)
  이름은 중요하지 않음, .module.css 확장자 붙여주는 것이 중요함
2. Button.js에서 import
3. return <button className={styles.btn}>{text}</button>;

Button.module.css // App.module.css
상기 두파일에서 같은 class명을 사용해도 상관없음
react.js는 서로 구분을 해줌(html내부에서는 random한 class 명을 붙여주기 때문)
react.js는 모듈화에 특화되어 있음
*/