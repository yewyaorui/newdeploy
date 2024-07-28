import React, { useState } from 'react';
import './Authentication.css';
import Login from './Login';
import Signup from './Signup';


import images from '../../constants/images';

function Authentication() {
    const [active, setActive] = useState("login");
    // set default state as "login"

    const handleChange = () => {
        setActive(active === "login" ? 'signup' : "login");
        // if u r at login page, click button will go signup page, viceversa  
    }

    return (
        <div className="authentication">
            <div className="auth__left">
                <img src={images.logo} alt="erguhjrgeherghjk" />

            </div>
            <div className="auth__right">
                {active === "login" ? (<Login />) : (<Signup />)}
                <div className='auth__more'>
                    <span>
                        {active === "login" ? (
                            <>
                                Don't have an account? <button onClick={handleChange}>Sign up</button>
                            </>
                        ) : (
                            <>
                                Have an account? <button onClick={handleChange}>Log in</button>
                            </>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Authentication;