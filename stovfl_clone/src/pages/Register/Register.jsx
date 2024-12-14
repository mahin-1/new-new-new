import React from "react";
import { useState,useRef } from "react";
import styles from "./Register.module.css";
import hidePwdImg from "/hide.svg";
import showPwdImg from "/show.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import url from '../../../url.js'

export default function Register() {
  const [style, setStyle] = useState(styles.no_error);
  const nameRef = useRef(null)
  const passRef = useRef(null)
  const [pwd, setPwd] = useState("");
  const [userName,setUserName] = useState('');
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const handleRegister = async ()=>{
    const data = {
      display_name: nameRef.current.value,
      password: passRef.current.value
    }
    let res = await axios.post(`${url.axios_url}/user`,data)
    setUserName(res.data.user_name)
    setStyle(styles.error)
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src="/favicon.png" />
        </div>
        <div className={styles.sub_main}>
          <h2 className={styles.h2_css}>Register</h2>

          <form className="login-form">
            <label className={styles.label_css} htmlFor="email">
              Name
            </label>
            <input
              ref = {nameRef}
              className={styles.input_css}
              type="email"
              placeholder="Your Name"
              id="text"
              name="email"
            />
            <label className={styles.label_css} htmlFor="password">
              Password
            </label>
            <div className={styles.pwd_container}>
              <input
              ref = {passRef}
                className={styles.input_css}
                name="pwd"
                placeholder="Enter Password"
                type={isRevealPwd ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            </div>
          </form>
          <button
            className={styles.button_css}
            onClick={handleRegister}
          >
            Register
          </button>
          <div className={style}>Your User Name is <Link to={`/${userName}`}>{userName}</Link> </div>
          <h4 className={styles.h4_css}>Already have an account ?</h4>
          <Link to='/login' className={styles.linkstyle}><button
            className={styles.butt}
            type="Sign In"
            onClick={() => setStyle(styles.no_error)}
          >
            Log In
          </button></Link>
        </div>
      </div>
    </>
  );
}
