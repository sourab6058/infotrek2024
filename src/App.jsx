import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ChatButton from "./components/ChatButton";

function App() {
  return (
    <div className="main">
      <Nav dark={true} />
      <Hero />
      <ChatButton />
    </div>
  );
}

export default App;
