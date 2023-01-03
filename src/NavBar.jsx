import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div className='navbar'>
            <div className="headerImg">
                {/* <img className="logoImg" src='./src/assets/headerRED1.png' /> */}
            </div>
            <div className='navButtons'>
                <NavLink
                    to="/"
                    exact
                >
                    Sightings
                </NavLink>
                <NavLink
                    to="/report"
                    exact

                >
                    Report a Sighting
                </NavLink>
                <NavLink
                    to="/news"
                    exact

                >
                    Alien News
                </NavLink>
            </div>
        </div>
    );
}

export default NavBar;