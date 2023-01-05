import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div className='navbar'>
            <div className="headerImg">
                <img className="logoImg" src='Alien Encounter.png' />
            </div>
            <div className='navButtons'>
                <div className="sightingNav">
                    <NavLink className="navLink" to="/" exact>
                        <h3 className ="fontColor">Sightings</h3>
                         </NavLink>
                    
                </div>
                <div className="reportNav">
                <NavLink className="navLink" to="/report" exact>
                    <h3 className="fontColor">Post</h3>
                </NavLink>
                </div>
                <div className ="newsNav">
                    <NavLink className="navLink" to="/news" exact>
                    <h3 className="fontColor">Alien News</h3>
                </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavBar;