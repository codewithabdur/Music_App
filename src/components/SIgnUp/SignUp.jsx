import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./SignUp.scss";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formNotSubmitted, setFormNotSubmitted] = useState(false);
  const [formFillSubmitted, setFormFillSubmitted] = useState(false);

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
        if (existingData.username === newData.username && existingData.email === newData.email) {
          return true; // Data already exists
        }
      }
    }

    return false; // Data does not exist
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { username, password, phone, email } = userData;

    if (username && password && phone && email) {
      const newData = { username, password, phone, email };
      const isDataExists = await checkDataExists(newData);

      if (isDataExists) {
        setFormNotSubmitted(true);
        setTimeout(() => {
          setFormNotSubmitted(false);
        }, 3000);
      } else {
        const res = await fetch(
          "https://register-data-bed5b-default-rtdb.firebaseio.com/user.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );

        if (res) {
          setUserData({
            username: "",
            password: "",
            phone: "",
            email: "",
          });

          setFormSubmitted(true);
          setTimeout(() => {
            setFormSubmitted(false);
          }, 3000);
        } else {
          setFormNotSubmitted(true);
          setTimeout(() => {
            setFormNotSubmitted(false);
          }, 3000);
        }
      }
    } else {
      setFormFillSubmitted(true);
      setTimeout(() => {
        setFormFillSubmitted(false);
      }, 3000);
    }
  };

  return (
    <>
    <div className="body">
      <div className="boxup">
        <form className="form" method="POST">
    <Link to="/">
    <FaTimes  className="times"/></Link>
          <h2>Sign Up</h2>
          <div className="inputBox">
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={postUserData}
              required
            />
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={postUserData}
              required
            />
            <span>Enter Your Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={postUserData}
              required
            />
            <span>Enter Password</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={postUserData}
              required
            />
            <span>Phone Number</span>
            <i></i>
          </div>
          <input type="submit" value="Register" onClick={submitData} />
          <div className="links">
          <p className="b">Already have account</p><p><Link to="/login"><span className="span">:Login</span></Link></p>
            {formSubmitted && <h2 >Data Stored</h2>}
            {formNotSubmitted && <h1 >Data Already Exist</h1>}
            {formFillSubmitted && <h1 >Please Fill All Details</h1>}
          
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUp;
