import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./assets/react.svg";
import Nav from "./components/Nav";
import About from "./views/About";
import Greet from "./views/Greet";
import Home from "./views/Home";

function App() {
  return (
    <main className="App">
      <Link to="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </Link>

      <Link to="https://reactjs.org" target="_blank">
        <img src={logo} className="logo react" alt="React logo" />
      </Link>

      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/greet" element={<Greet />} />
      </Routes>
    </main>
  );
}

export default App;
