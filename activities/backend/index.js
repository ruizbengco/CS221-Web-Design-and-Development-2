import express from "express";

const app = express();
const PORT = 2999;

app.use(express.json());

app.get("/getName", (req, res) => {
  var name = "Ruiz";
  res.status(200).json(name);
});

app.post("/login", (req,res) => {
  var {username, password} = req.body;
  if (username == "Ruiz" && password == "123pass") {
    res.status(200).json({
      message: "Login Succesfully",
      status: "Success"
    })
  } else {
    res.status(403).json({
      message: "Invalid Username or Password",
      status: "Failed"
    }) 
  }
});

app.listen(PORT, () => {
  //get -> fetch, name var name="Ruiz"

  //post -> logic; if username="Ruiz", password="123pass" alert login succesful

  console.log(`Server is Running on PORT: ${PORT}`);
});
