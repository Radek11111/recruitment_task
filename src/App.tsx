import "./App.css";
import Pesel from "./components/Pesel";
import TextShuffler from "./components/TextShuffler";
import Users from "./components/Users";
function App() {
  return (
    <div className="app">
      <TextShuffler />
      <Pesel />
      <Users />
    </div>
  );
}

export default App;
