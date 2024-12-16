import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../../services/index";
import styles from "./login.module.css";
import { Link , useNavigate} from "react-router-dom";
import sideImg from "../../assets/side.png";



function Login() {
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      alert("Already logged in")
      navigate('/home')
    }
  },[])

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(loginData);
    if (res.status === 200) {
      const data = await res.json()
      localStorage.setItem('token', data.token)
      alert("Logged In successfully");
      navigate('/home')
    } 
    else {
      alert("Error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h1 className={styles.title}>Already have an account?</h1>
        <p className={styles.subtitle}>Your personal job finder is here</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, [e.target.name]: e.target.value })
            }
          />
          <button type="submit">Sign In</button>
        </form>
        <Link to="/register" className={styles.link}>
          Don't have an account? Sign Up
        </Link>
      </div>
      <div className={styles.rightPanel}>
        <img src={sideImg} />
      </div>
    </div>
  );
}

export default Login;
