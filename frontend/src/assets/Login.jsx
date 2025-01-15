import { Link } from "react-router-dom";

Link;

const Login = () => {
  return (
    <>
      <div>
        <div>
          <h2>Login</h2>

          <form>
            <div>
              <label htmlFor="email">
                <strong>Email-Id</strong>
              </label>
              <input type="text" placeholder="Enter Your Email"></input>
            </div>

            <div>
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input type="text" placeholder="Enter Your Password"></input>
            </div>

            <button type="submit"> Login</button>
            <p>Create an account</p>
            <Link to="/Register">Signup</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
