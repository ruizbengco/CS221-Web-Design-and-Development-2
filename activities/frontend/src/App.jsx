import './App.css'

function App() {
  const [FormData, setFormDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //link to backend
    //fetch or actios(3rd party)
    setFormData({

      ...formData,
      (e.target.name): e.target.value,
    });

    const message = await fetch('http://localhost:2999/login' {
      method: 'POST',
      headers: (
        "content type": "application/json",
      ),
      body: J
    });
  };
 
  return (
    <>
      <h1>Login Page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label for="username">Usernane: </label>
          <input type="username" name="username" id="username"></input>
          <label for="Password">Passowrd: </label>
          <input type="password" name="password" id="password"></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default App
