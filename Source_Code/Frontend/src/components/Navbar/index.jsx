import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import AppLogo from '../../images/logo.png'
import UserContext from "../../context/UserContext";


const Navbar = () => {
  const [pathname, setPathName] = useState(window.location.pathname);
  const location = useLocation()

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location])

  const checkIfHighlight = (path) => {
    if (path === pathname) {
      return true
    }
    return false
  }

  const checkShowForRole = (role) => {
    if (user.role === role) {
      return true
    }
  }
  return (
    <nav className="navbar">
      <div className="container">
        <Link className="app-info" to='/'>
          <img className='app-logo' src={AppLogo} alt="" />
          <span className="app-name">MovieMate</span>

        </Link>

        <div className="item-container" >
          <div className="nav-item">
            <Link to="/"
              className={checkIfHighlight('/') ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Link>
          </div>

          {
            checkShowForRole('STAFF') &&
            <div className='nav-item'>
              <Link to="/create-order"
                className={checkIfHighlight('/create-order') ? 'nav-link active' : 'nav-link'}
              >
                Create Order
              </Link>
            </div>
          }


          {
            checkShowForRole("STAFF") &&
            <div className='nav-item'>
              <Link to="/order-history"
                className={checkIfHighlight('/order-history') ? 'nav-link active' : 'nav-link'}
              >
                Order history
              </Link>
            </div>
          }

          {
            checkShowForRole("ADMIN") &&
            <div className="nav-item">
              <Link
                to="/movies"
                className={checkIfHighlight('/movies') ? 'nav-link active' : 'nav-link'}
              >
                Movies
              </Link>
            </div>
          }


          {
            checkShowForRole("ADMIN") &&
            <div className="nav-item">
              <Link
                to="/theater-rooms"
                className={checkIfHighlight('/theater-rooms') ? 'nav-link active' : 'nav-link'}
              >
                Theaters
              </Link>
            </div>
          }


          {
            checkShowForRole("ADMIN") &&
            <div className="nav-item">
              <Link
                to="/foods-and-drinks"
                className={checkIfHighlight('/foods-and-drinks') ? 'nav-link active' : 'nav-link'}
              >
                Foods & Drinks
              </Link>
            </div>
          }

          {
            checkShowForRole("ADMIN") &&
            <div className="nav-item">
              <Link
                to="/staffs"
                className={checkIfHighlight('/staffs') ? 'nav-link active' : 'nav-link'}
              >
                Staffs
              </Link>
            </div>
          }


          <div className="nav-item">
            <Link
              className="navbar-user"
              to='/profile'
            >
              <img
                alt=""
                src={user.avatar}
                className="rounded-circle"
              />
            </Link>
          </div>




        </div>

      </div>
    </nav >
  );
};

export default Navbar;
