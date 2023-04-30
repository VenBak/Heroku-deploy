import React from 'react';
import { Link } from 'react-router-dom';
import NavTabs from './NavTabs'
import Auth from '../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.assign('/');
    };


    return (
        <header className= "header">
            <div className="flex-row justify-space-between-lg justify-center align-center" style={{width:"95vw", display: "flex"}}>
            <h1 className='vis'>The Visible Hand</h1>
                <NavTabs/>
                <div>
                    {Auth.loggedIn() ? (
                        <div>
                            <span style={{fontSize: "20px"}}>Hey there, {Auth.getProfile().data.username}!</span>
                            <button className="red" onClick={logout}>
                                Logout
                            </button>
                            <Link className="red" to="/update">
                                Update
                            </Link>
                            <Link className="red" c to="/createpost">
                                Create Post
                            </Link>

                        </div>
                    ) : (
                        <>
                            
                            <Link className="red" to="/login">
                                Login
                            </Link>
                            <Link className="red" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;