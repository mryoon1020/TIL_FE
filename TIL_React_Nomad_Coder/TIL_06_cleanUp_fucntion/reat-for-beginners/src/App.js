import { useEffect, useState } from 'react';

function Hello(){

  // useEffect(() => {
  //   console.log("hi :)");
  //   return () => console.log("bye :(")
  // },[]);

  useEffect(function() {
    console.log("hi :)");
    return function(){ 
      console.log("bye :(")
    };
  },[]);

  return <h1>Hello</h1>;
}

function App() {
  const[showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing?<Hello />:null}
      <button onClick={onClick}>{showing ? "Hide":"Show"}</button>
    </div>
  );
}

export default App;

/*
function Hello(){
  useEffect(()=>{
    console.log("I am here!!")
  },[])
  return <h1>Hello</h1>;
}

I am here!!가 show 할때마다 출력됨, 컴포넌트(Hello함수)가 계속 파괴되었다가 생성되기 때문
=> 잔여코드없이 html상에서는 잔여코드가 없음

  useEffect(()=>{
    console.log("created :)")
    return () => console.log("destroyed :(");
  },[])

  return 부분을 cleanup function이라고 부름, 컴포넌트가 파괴될때
  무엇인가를 할수 있도록 도와줌 상기코드에서는 destroyed를 콘솔에 찍어줌

이해를 돕기 위해 풀어 쓴 cleanup function

  function byeFn(){
    console.log("bye :(");
  }

  function hiFn(){
    console.log("created :)");
    return byeFn;
  }

  useEffect(hiFn,[])


  */