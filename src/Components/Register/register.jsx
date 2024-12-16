import React from "react";
import { useState } from "react";
import { register } from "../../services/index";
import styles from "./register.module.css";
import sideImg from "../../assets/side.png";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    if (res.status === 200) {
      alert("Registered successfully");
    } else {
      alert("Error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>Your personal job finder is here</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="phone"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <p className={styles.terms}>
            <input type="checkbox" required /> By creating an account, I agree
            to terms of use and privacy policy.
          </p>
          <button type="submit">Create Account</button>
        </form>
      </div>
      <div className={styles.rightPanel}>
        <img src={sideImg} style={{ height: "100%" }} />
      </div>
    </div>
  );
}

export default Register;
