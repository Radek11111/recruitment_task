import "./App.css";
import Pesel from "./components/Pesel";

import TextShuffler from "./components/TextShuffler";

function App() {
  return (
    <div className="app">
      <TextShuffler />
      <Pesel />
    </div>
  );
}

export default App;
