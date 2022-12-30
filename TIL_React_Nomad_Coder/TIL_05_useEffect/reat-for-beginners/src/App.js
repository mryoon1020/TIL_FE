import { useState, useEffect } from 'react';

function App() {
  const [counter, setValue] = useState(0);
  const[keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  useEffect(()=>{
    console.log("I run only once.");
  },[]);
  useEffect(()=> {
    console.log("I run when 'keyword' changes.");
  },[keyword]);
  useEffect(()=> {
    console.log("I run when 'counter' changes.");
  },[counter]);

  useEffect(()=> {
    console.log("I run when 'keyword' & 'counter' changes.");
  },[keyword, counter]);

  return (
    <div>
      <input 
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder='Search here...' 
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;

/*
  const iRunOnlyOnce = () => {
    console.log("Call the API...");
  }
  useEffect(iRunOnlyOnce,[]);

  useEffect(()=>{
    console.log("Call the API...");
  },[]);

  둘다 같은 것임

useEffect는 코드를 딱한번만 실행 될 수 있도록 해줌
사용하려면 import { useState, useEffect } from 'react'; 요렇게 해줘야함

  const [counter, setValue] = useState(0);
  const[keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  console.log("I run all the time");
  useEffect(()=>{
    console.log("Call the API...");
  },[]);

  console.log("Search for", keyword);

  return (
    <div>
      <input 
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder='Search here...' 
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );

  상기와 같이 짜게 되면 input에 입력하면
  console에서 console.log("Search for", keyword);만 반복됨
  button 클릭해도 같이 반복됨
  즉, counter가 변화할때 keyword도 같이 검색하지 않도록 처리해주어야함
    useEffect(()=> {
    console.log("Search for", keyword);
  },[keyword]);

  요렇게 처리해줌
  ===> keyword가 변화 할때만 코드를 실행한다라고 react에게 알려주는 것임

  useEffect(()=>{
    console.log("Call the API...");
  },[]);

  => react가 지켜볼것이 없으므로 처음 한번만 실행(빈배열[]이기 때문)

  useEffect(()=> {
    console.log("Search for", keyword);
  },[keyword]);

  => react에게 keyword를 지켜보게 했기때문에 keyword가 변화할때마다 코드가 실행됨

  useEffect(()=> {
    if(keyword !== "" && keyword.length >5){
    console.log("Search for", keyword);
    }
  },[keyword]);

  => 조건에 만족할때만 코드가 실행 될것임, 처음부터에도 실행 되지 않음

    useEffect(()=> {
    console.log("I run when 'keyword' & 'counter' changes.");
  },[keyword, counter]);

  => keyword, counter 둘중 하나라도 변화가 되면 실행됨

  useEffect(실행을 원하는 코드,dependency);
  => dependency에 대해 어렵게 생각할 필요없이 react가 감시하게 해줄 값을 넣으면 됨
*/