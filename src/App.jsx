import { useState } from "react";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button"
import Hero from "./components/Hero";

function App() {

  const user = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    address: "Biratnagar Nepal",
  };

  const user2 = {
    firstName: "new user",
    lastName: "Doe",
    age: 25,
    address: "Kathmandu Nepal",
  };

  const [count, setCount] = useState(0);
  

  return (
    <>
    <Navbar data={user2} color={"red"} />
    <Hero />
    </>
  )
}

export default App
