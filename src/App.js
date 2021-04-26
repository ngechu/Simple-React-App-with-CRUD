import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ListUsers from "./components/users/listUsers";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ListUsers} />
    </div>
  );
}

export default App;
