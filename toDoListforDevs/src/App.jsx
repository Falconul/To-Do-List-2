import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoList from "./components/TodoList.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <div className="ClipBoard ">
        <TodoList />
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
