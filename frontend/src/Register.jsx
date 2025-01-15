import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/register", values)
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  };

  return (
    <>
      <div>
        <div>
          <h2>Signup</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => {
                  setValues({ ...values, name: e.target.value });
                }}
              ></input>
            </div>

            <div>
              <label htmlFor="email">
                <strong>Email-Id</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Your Email-Id"
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
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
                  setValues({ ...values, password: e.target.value });
                }}
              ></input>
            </div>

            <button type="submit"> Sign-up</button>
            <Link to="/login">Login</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
