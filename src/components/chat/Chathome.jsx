import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import "./Chathome.css";

const Chathome = () => {
    return (
        <div className='Chathome'>
            <div className="container">
                <Sidebar/>

                <Chat/>
            </div>
        </div>
    )
}

export default Chathome