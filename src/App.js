import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import ScrollToTop from "./ScrollTop";
import Fav from "./routes/Fav";

/*
  BrowserRouter에서 URL은 보통의 웹사이트처럼 생김. 
  HashRouter는 /#/movie와 같이 #를 붙여서 사용.
  Link는 브라우저 새로고침 없이도 유저를 다른 페이지로 이동시켜주는 컴포넌트.
*/
function App() {
  return (
    <Router basename="/react-for-beginners-movie">
      <Switch>
        <Route path="/hello">
          <h1>Hello</h1>
        </Route>
        <Route path="/fav">
          <Fav/>
        </Route>
        <Route path="/movie/:id">
          <Detail/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
      <ScrollToTop/>
    </Router>
  );
}

export default App;