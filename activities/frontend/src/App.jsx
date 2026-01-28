import './App.css'
import Login from "./pages/Login";
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //link to backend
    //fetch or actios(3rd party)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringfy(formData),
    });
  };
 
  return (
    <>
      <Login>

      </Login>
    </>
  );
};

export default App;
