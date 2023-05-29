import { useState, useEffect } from "react";

function App() {
  /*
    1. state가 변경될 때 component는 다시 실행되고 모든 code도 다시 실행됨. 
      => UI 관점으로 보면, 새로운 데이터가 들어올 때마다 자동 새로고침 되서 좋음. 
      => 다만 어떤 코드들은 이렇게 계속 실행되면 안 될 수도 있는데 이게 바로 useEffect을 사용하는 이유
      => useEffect을 통해 우리는 언제 코드를 실행할 지 선택권을 가질 수 있다.
      2. useEffect function 은 우리 코드가 딱 한 번만 실행될 수 있도록 보호해줌.
    3. useEffect은 react.js가 동작하는 관점에서 말하자면 방어막 같은 것.
  */

  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  // 단 한 번만 실행됨. useEffect가 감시하는게 없기 때문에.
  useEffect(() => {
    console.log("I run only once.");
  }, []);

  // 'keyword' 가 변화할 때만 코드를 실행할 거라고 react.js에게 알려주는 것.
  useEffect(() => {
    console.log("I run when 'keyword' changes.")
  }, [keyword]);

  // 'counter' 가 변화할 때만 코드를 실행할 거라고 react.js에게 알려주는 것.
  useEffect(() => {
    console.log("I run when 'counter' changes.")
  }, [counter]);

  useEffect(() => {
    console.log("I run when keyword and counter changes.");
  }, [keyword, counter]);

  return (
    <div>
      <input 
        value={keyword} 
        onChange={onChange} 
        type="text" 
        placeholder="Search here..."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;