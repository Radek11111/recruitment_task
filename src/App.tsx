import "./App.css";
import PeselValidation from "./components/PeselValidation";
import TextShuffler from "./components/TextShuffler";

function App() {
  return (
    <div className="app">
      <TextShuffler />
      <PeselValidation />
    </div>
  );
}

export default App;
