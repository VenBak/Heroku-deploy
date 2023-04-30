import React from 'react';
import { Link } from 'react-router-dom';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs (){
  return (
    <ul className="nav justify-content-center Tabs">
      <li className="nav-item">
        <Link className="text-light" style={{textDecoration: "none"}} to="/home">
          <h3 className="m-0 link" style={{fontSize: "15px"}}>Home</h3>
        </Link>
      </li>
      <li className="nav-item">
      <Link className="text-light"style={{textDecoration: "none"}} to="/about">
          <h3 style={{fontSize: "15px"}} className="m-0 link">About</h3>
        </Link>
      </li>
    </ul>
  );
}

        
export default NavTabs;
