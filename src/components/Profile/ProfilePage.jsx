import React from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";

const ProfilePage = () => {
  const { username } = useParams();

  return <Profile username={username} />;
};

export default ProfilePage;
