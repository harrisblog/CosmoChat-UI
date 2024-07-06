import "./App.css";
import NavBar from "./components/NavBar";
import { RouteList } from "./router/Router";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ marginTop: "50px", minHeight: "calc(100vh - 50px)" }}>
        <RouteList />
      </div>
    </div>
  );
}

export default App;
