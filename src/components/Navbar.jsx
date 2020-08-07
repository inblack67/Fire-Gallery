import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

const Navbar = () => {

    const authContext = useContext(AuthContext);

    const { isAuthenticated, login, logout } = authContext;

    const onLogin = e => {
        login();
    }

    const onLogout = e => {
        logout();
    }

    const authLinks = <Fragment>
        <li>
            <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
            <a href='#!' onClick={onLogout} className='red-text'>Logout</a>
        </li>
    </Fragment>

    const guestLinks = <Fragment>
        <li>
            <a href='#!' onClick={onLogin}>Login</a>
        </li>
        <li>
            <Link to='/about' className='red-text'>About</Link>
        </li>
    </Fragment>

    return (
        <nav className="black">
            <div className="nav-wrapper">
                <div className="container">
                    <Link className='brand-logo left' to='/'><span>
                        React</span> | <span className="red-text">
                            Firebase</span></Link>
                    <ul className="right">
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
