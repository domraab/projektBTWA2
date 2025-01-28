import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("manager");
  const [password, setPassword] = useState("manager123");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
 
    <div className="bg-gradient-primary d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      
      <div className="container">
        <div className="row justify-content-center">
          
          <div className="col-xl-6 col-lg-8 col-md-9">
            <div className="card o-hidden border-0 shadow-lg">
  
              <div className="card-body p-0">
                <div className="p-5">
                  

                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}


                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="form-label">Username</label>
                      <input
                        className="form-control form-control-user"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <label className="form-label">Password</label>
                      <input
                        className="form-control form-control-user"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-user btn-block">
                      Login
                    </button>
                  </form>
                  
                  <hr />


                  <div className="text-center">
                    <a className="small" href="#!">Forgot Password?</a>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
