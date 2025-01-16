import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/login", value)
      .then((res) => {
        if (res.data.Message === "All field are mandetory") {
          alert(res.data.Message);
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div>
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">
                <strong>Email-Id</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Your Email"
                onChange={(e) => {
                  setValue({ ...value, email: e.target.value });
                }}
              ></input>
            </div>

            <div>
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setValue({ ...value, password: e.target.value });
                }}
              ></input>
            </div>

            <button type="submit"> Login</button>
            <p>Create an account</p>
            <Link to="/Register">Signup</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
