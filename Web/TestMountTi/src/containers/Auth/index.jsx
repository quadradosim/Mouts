import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from "../../hooks/AuthProvider";

const Login = () => {
  
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log('handleSubmitEvent')
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-50  container-sm">
      <div className="border rounded-5">      
        <section className="w-100 p-4 d-flex justify-content-center pb-4">
          <form  onSubmit={handleSubmitEvent}>
            {/* <!-- Email --> */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" placeholder="example@yahoo.com" id="user-name" name="username" aria-describedby="user-name" className="form-control" onChange={handleInput}/>
              <label className="form-label" htmlFor="user-email">Email address</label>
            </div>

            {/* <!-- Password --> */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="password" name="password" aria-describedby="user-password" aria-invalid="false" onChange={handleInput} className="form-control" />
              <label className="form-label" htmlFor="password">Password</label>
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
              </div>
            </div>
            <div className="row mb-4">
              <button className="btn btn-primary btn-block mb-4">Sign in</button>
            </div>
            <div className="row mb-4">
              <div className="text-danger text-center font-weight-bold" id="errorMessage"></div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;