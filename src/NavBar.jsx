import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div className='navbar'>
            {/* <div className="headerImg"> */}
            {/* <img className="logoImg" src='./src/assets/headerRED1.png' /> */}
            {/* </div> */}
            <div className='navButtons'>
                <div className="sightingNav">
                <NavLink to="/" exact> Sightings</NavLink>
                </div>
                <div className="reportNav">
                <NavLink to="/report" exact>Report a Sighting</NavLink>
                </div>
                <div className ="newsNav">
                <NavLink to="/news" exact>Alien News</NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavBar;