import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { FaTimes } from "react-icons/fa";

const Login = () => {

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });

    

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLink, setLink] = useState(false);
  const [formNotSubmitted, setFormNotSubmitted] = useState(false);
  // const [formFillSubmitted, setFormFillSubmitted] = useState(false);

  let navigate = useNavigate;

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const checkDataExists = async (newData) => {
    const res = await fetch(
      "https://register-data-bed5b-default-rtdb.firebaseio.com/user.json"
    );
    const data = await res.json();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const existingData = data[key];

        // Compare the new data with existing data
        // Adjust this condition based on your data structure
        if (existingData.username === newData.username || existingData.email === newData.email || existingData.phone === newData.phone) {
          return true; // Data already exists
        }
      }
    }

    return false; // Data does not exist
  };

  const submitData = async (event) => {
    event.preventDefault();
  let { username, password, email } = userData;


    if (username && password  && email) {
      const newData = { username,password, email };
      const isDataExists = await checkDataExists(newData);

      if (isDataExists) {
        setUserData({
          username: "",
          password: "",
          email: "",
        });
        setFormSubmitted(true);
        setLink(true);
        setTimeout(() => {
          setFormSubmitted(false);
        }, 3000);
        setTimeout(() => {
          setLink(false);
        }, 6000);
        navigate("/profile");
      }  else {
      setFormNotSubmitted(true);
      setTimeout(() => {
        setFormNotSubmitted(false);
      }, 3000);
    }
  };
};
  
  return (
    <div className="body">
      <div className="box">
        <form className="form" action="">
       <Link to="/"><FaTimes className="times" /></Link>
          <h2>Sign In</h2>
          <div className="inputBox">
            <input type="text" name="username" value={userData.username}
              onChange={postUserData} required />
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input type="password" name="password" value={userData.password}
              onChange={postUserData} required />
            <span>Enter Password</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input type="email" name="email" value={userData.email}
              onChange={postUserData} required />
            <span>Enter Email</span>
            <i></i>
          </div>
          <input type="submit" value="Login" onClick={submitData}  />
          <div className="linksex">
            <Link to="/" className="span">Forget Password</Link>
            <div className="spandexp"> Create Account :
            <Link to="/signup" className="spandex">  SignUp</Link></div>
            {formSubmitted && <h2 >Alright! You are in!</h2>}
            {formLink && <Link to="/profile"> <h2 >Go to Profile</h2></Link>}
            {formNotSubmitted && <h1 >Data Not Match</h1>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login
