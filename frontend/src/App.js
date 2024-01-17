import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Menu from "./pages/Menu";
import Add from "./pages/Add";
import Update from "./pages/Update"
import Home from "./pages/Home"
import Login from "./pages/Login"
import "./styles.css"
import Membership from "./pages/Membership";
import About from "./pages/About"
import Grocery from "./pages/Grocery";
import Edit from "./pages/Edit"
import Admin from "./pages/Admin"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/membership" element={<Membership/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/browse" element={<Grocery/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/menu" element={<Menu/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/update/:id" element={<Update/>}></Route>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
