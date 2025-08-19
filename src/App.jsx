import { useState } from "react";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button"

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
      <p>
        First Name: {user.firstName} <br />
        Last Name: {user.lastName} <br />
        Age: {user.age} <br />
        Address: {user.address}<br />
        count: {count}
      </p>
      <Button onClick={()=>{setCount( count+5 )}} >Add</Button>
      <Navbar data={user} color={"blue"} />
    </>
  )
}

export default App
