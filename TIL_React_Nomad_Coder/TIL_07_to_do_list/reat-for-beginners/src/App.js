import { useState } from 'react';

function App() {
  const [toDo,setToDo]= useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if(toDo === ""){
      return;
    }
    setToDos(currentArray => [toDo,...currentArray]);
    setToDo("");
  };
  console.log(toDos);
  console.log(toDos.map((item, index) => (
    <li key={index}>{item}</li>
  )));
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} type="text" placeholder='Write your to do...' />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
/*
배열관련
const food = [1, 2, 3, 4]
food 배열에 6을 추가하고 싶음
[6,food] 이렇게 되면 [6, Array(4)] 로 6과 크기가 4인 배열(food)로 이루어진 배열이 생성됨
[6, ...food] 하게되면 [6, 1, 2, 3, 4]인 배열로 됨
즉, 기존 배열 앞에 새로운 요소를 추가하려면 ...을 쓰면 됨

{toDos.map(() => ":)")}
=> map() 모든 요소에 대해 적용이 됨 , map은 array의 요소를 내가 원하는 요소롤 바꿔주며 새로운 배열로 리턴해줌

toDos.map((item) => ":)")
=> map은 함수의 첫번째 argument로 현재의 item을 가져 올 수 있음
=> ()안에 변수명은 상관 없지만 어쨌든 argument가 진행되고 있는 순서와 같다는것임
=> ex) [c, q, d, a].map((item) => item.toUpperCase())
=> 결과) [C, Q, D, A]

cosolo에서 Warning: Each child in a list should have a unique "key" prop.
이라도 뜰것임 아주 단순한 오류로
컴포넌트의 list를 render할때 key라는 prop을 넣어달라는 뜻임
왜냐하면 react가 기본적으로 list에 있는 모든 item들을 인식하기 때문임
그러면 그냥 단순히 key 값을 넣어주면 됨
단, key 값은 unique 해야함
여기서는 map함수를 뜯어 보면 (value: any, index: number, array:any[])로 되어있으므로
index(0, 1, 2, 3...으로 구성되있음, 숫자임)를 사용하면 됨

toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))
여기서도 item과 마찬가지로 index도 변수명은 자유롭게 써도됨
*/