import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import SideDrawer from "./sideNavigation";

const Header = () => {

    const [showHeader, setShowHeader] = useState(false);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
    }, [location.pathname]);

    return (
        <>
            {showHeader ?
                <>
                    <nav className='navbar dash_layout ' style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <Link to='/' className="navbar-brand d-flex" style={{ fontFamily: 'Fredoka One' }}>
                            Resume Air
                        </Link>
                        <SideDrawer />
                    </nav>

                </>
                : null}
        </>

    )
}




export default Header;