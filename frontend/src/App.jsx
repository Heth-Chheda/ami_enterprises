import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const handleClick = () => {
    alert("Hello");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Button onClick={handleClick}>Click me</Button>
      </div>
    </>
  );
}

export default App;
