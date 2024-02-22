import {Link} from "react-router-dom";

export function Navbar({user, loggedInNav, logoutUser, resetErrorMsg}) {
    return (
        <>
            {
                loggedInNav ? (
                    <nav className="nav">
                        <ul>
                            <li>
                                <Link to="/dashboard" onClick={resetErrorMsg}>Dashboard</Link>
                            </li>
                            <li>
                                <Link className="nav__create-message" to="/create-message" onClick={resetErrorMsg}>Create
                                    a message</Link>
                            </li>
                            {!user.member && (
                                <li>
                                    <Link className="nav__membership" to="/membership-update"
                                          onClick={resetErrorMsg}>Membership</Link>
                                </li>)}

                            <li>
                                <Link className="nav__logout" onClick={logoutUser} to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                ) : (
                    <nav className="nav">
                        <ul>
                            <li>
                                <Link to="/dashboard" onClick={resetErrorMsg}>Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/signup" onClick={resetErrorMsg}>Sign up</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={resetErrorMsg}>Log in</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </>
    )
}