import React, { useState, useEffect } from "react";
import { MenuList } from "./MenuLinks";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useGlobalContext } from "../../Hooks/useGlobalContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useGlobalContext();
  console.log(user, "USER");
  const navigate = useNavigate();
  /*  const [isLogged, setIsLogged] = useState(false); */
  /*  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []); */
  function logout() {
    localStorage.removeItem("token");
    setShowMenu(!showMenu);
    navigate("/login");
  }
  return (
    <nav>
      <div className="nav-center">
        <div id="logo">
          ROD <font>LOP</font>
        </div>
        <div
          className={"containerYborderBurger " + (showMenu ? "" : "close")}
          onClick={function () {
            setShowMenu(!showMenu);
          }}
        >
          <div className="burgerMenu"></div>
        </div>
      </div>
      {/* add the active class to show or not the nav links */}
      <ul className={showMenu ? "" : "active"}>
        {user
          ? MenuList.hayUser.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={`${item.url}`}
                    onClick={item.title === "Cerrar sesión" ? logout : ""}
                  >
                    {" "}
                    {item.title}
                  </Link>
                </li>
              );
            })
          : MenuList.noHayUser.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={`${item.url}`}> {item.title}</Link>
                </li>
              );
            })}
      </ul>
    </nav>
  );
};

export default Navbar;
