import React from 'react';
import background from '../../images/ocean-background.png';
import './layout.css';

const Layout = ({ children }) => {
    return (
        <div className='layout' style={{ backgroundImage: `url(${background})` }}>
            {children}
        </div>
    )
}

export default Layout;