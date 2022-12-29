import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

/*
<React.StrictMode>로 <App />를 감싸면 app.js에서 return윗부분이 실행이 두번됨
strict 모드란 react 앱 내의 잠재적인 문제를 알아내기 위한 도구(https://ko.reactjs.org/docs/strict-mode.html)참고
*/