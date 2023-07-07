
import "./App.css";
import { Body, HomePage, } from "./container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, SignUp, Profile } from "./components";

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* <Route path="//:slug" element={<HomePage />}></Route> */}
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/music" element={<MusicPage />}></Route> */}
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
