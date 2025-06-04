import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import SearchBar from "./Components/SearchBar/SearchBar";
import { getAuthContext } from "./context/authContext";

function App() {
  const { user } = getAuthContext();
  return (
    <>
      <div>
        <header>
          <Navbar> {user && <SearchBar></SearchBar>}</Navbar>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
}

export default App;
