const a = 5;
const b = 2;
let myName ="Yoon"

const c = true;
const d = false;

const e = null;
let f;
var g;

console.log(a+b);
console.log(a*b);
console.log(a/b);
console.log("Hello" + myName);

myName = "Mr"

console.log("your name is" + myName);




/*
const : 변하지 않는 값(constant), 업데이트 불가

공백을 원하면 대문자를 씀 myName 이런식으로
파이썬은 언더바'_'를 씀 my_name 요렇게 파이썬은 변수선언시 앞에 추가적으로 필요없음
그냥 my_name = 1 이렇게 잡음

let : 변경가능한 값 

const, let 은 나중에 생긴 것으로 예전에는 var만 있었음
var는 규칙없음 let이랑 같음

boolean : true, false로만 이루어진 변수 선언시 사용 그냥 const = true; 이렇게 선언

null : 아무것도 없는 값, 값은 값이지만 아무것도 없음(공백, 0, 텍스트 등 아님)

undefined : const 불가, let, var만 가능, 컴퓨터가 변수에 대해서 인지하고 있지만 값이 없는것,
            null과 다름, 값자체가 없음, 아무것도 할당되지 않았음,
            즉, 메모리안에는 있지만 아무값도 들어가있지 않은값

*/