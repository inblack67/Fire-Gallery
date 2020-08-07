import React, { Fragment, useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import { Link } from 'react-router-dom'

const Home = () => {

    const authContext = useContext(AuthContext);
    const { isAuthenticated, user, login } = authContext;

    const onLogin = e => {
        login();
    }

    return (
        <div className='center'>
            { isAuthenticated ? <div>
                <p className="flow-text">
                    Welcome <span className="red-text">
                        {user.displayName}
                    </span>
                </p>
                <Link to='/dashboard' className='btn red pulse'><i className="material-icons left">launch</i> Dashboard</Link>
            </div> : <Fragment>
                    <p className="flow-text">Welcome <span className="red-text">
                        Aboard!</span></p>
                    <button onClick={onLogin} className="btn red pulse">
                        <i className="material-icons left">login</i> Login With Google
                </button>
                </Fragment>}
        </div>
    )
}

export default Home
