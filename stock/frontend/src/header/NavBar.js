import React from "react";
import "./NavBar.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
axios.defaults.withCredentials = true

const NavBar = () => {
  // const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable to logout. Please try again");
  }
  const handleLogout = () => {
    sendLogoutReq()/*.then(() => dispatch(authActions.logout()))*/
  }

  return (
    <>
      <div className="TopArea">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0vh",
            padding: "3%"
          }}
        >
          <div style={{ marginLeft: "2vw" }}>
            <strong style={{ fontSize: "1.8rem" }}>STOCK-ANALYZER</strong>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            <Link to="/" className="underLine2 hide_on_responsive">
              <Button variant="text" color="default">
                Home
              </Button>
            </Link>
            <Link to="/dashboard" className="underLine2 hide_on_responsive" href="">
              <Button variant="text" color="default">
                Dashboard
              </Button>
            </Link>
            <Link to="/news" className="underLine2 hide_on_responsive" href="">
              <Button variant="text" color="default">
                News
              </Button>
            </Link>

            { !isLoggedIn  && 
              <>
                <Link to='/login' className="underLine2">
                  <Button variant="outlined" color="secondary">
                    Login
                  </Button>
                </Link>
                <Link to='/signup' className="underLine2">
                  <Button variant="outlined" color="secondary">
                    Signup
                  </Button>
                </Link>
              </>
            }    

            { isLoggedIn && (
              <Link onClick={handleLogout} to='/' className="underLine2">
                <Button variant="outlined" color="secondary">
                  Logout
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
