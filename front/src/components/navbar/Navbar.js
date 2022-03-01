import React, { useState } from "react";
import { MenuList } from "./MenuLinks";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { logout } from "../../API/userAPI";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, dispatch, deleteUserStorage } = useGlobalContext();
  const navigate = useNavigate();

  function logoutProcess() {
    setShowMenu(!showMenu);
    logout(dispatch, deleteUserStorage, navigate);
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
        {user ? (
          <>
            <li>
              <Link to={`/profile/${user._id}`}>
                {!user.nombre || user.nombre.length > 10
                  ? "Usuario"
                  : user.nombre}
              </Link>
            </li>
            {MenuList.hayUser.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={`${item.url}`}
                    onClick={
                      item.title === "Cerrar sesión" ? logoutProcess : ""
                    }
                  >
                    {" "}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </>
        ) : (
          MenuList.noHayUser.map((item, index) => {
            return (
              <li key={index}>
                <Link to={`${item.url}`}> {item.title}</Link>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
