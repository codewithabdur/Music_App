import "./Profile.scss";
import { img } from "../../constant";
import { BsFillBackspaceFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {auth} from '../../lib/firebase'
import { useEffect } from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";

const Profile = (props) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  return (
    <>
    <Link to="/"> <BsFillBackspaceFill className="icon"/></Link>
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow mt-2">
      <div className="flex items-center justify-center mb-4">
        <img
          src={img.code}
          className="w-20 h-20 rounded-full"
        />
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="username" name={{userName}} className="block mb-1">
          userName
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div
          type="submit"
          className="btn2"
        >Save</div>
      </form>
    </div>
    </>
  );
};

export default Profile;
