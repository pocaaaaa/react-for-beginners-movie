import { useEffect, useState } from "react";

function Hello() {
  function byFn() {
    console.log("destroy :(");
  }
  function hiFn() {
    console.log("created :)");
    return byFn;
  }
  useEffect(hiFn, []);

  useEffect(() => {
    console.log("hi :)");
    // cleanUp function 
    // component가 destroy될 때 뭔가 할 수 있도록 해줌.
    return () => console.log("bye :(")
  }, []);

  useEffect(function() {
    console.log("hi :)");
    return function() {
      console.log("bye :(")
    };
  }, []);
  return (<h1>Hello</h1>);
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing(prev => !prev);
  
  // {showing ? <Hello /> : null}
  // component를 없애거나(destroy), 생성(create) 되기 때문에 
  // useEffect 안에 console.log가 계속 찍힘.
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;