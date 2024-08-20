import React, { useContext, useState } from "react";

import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("https://testwizardbackend.onrender.com/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    navigateTo("/login");
  };
  const AddQuestionPage = () => {
    navigateTo("/addquestion");
    setShow(!show);
  };
  const ShowQuestionPage = () => {
    navigateTo("/questions");
    setShow(!show);
  };
  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <MdOutlineLibraryAdd onClick={AddQuestionPage} />
          <BsFillQuestionSquareFill onClick={ShowQuestionPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
