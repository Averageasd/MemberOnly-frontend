import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {Navbar} from "./Navbar.jsx";

export function Nav({user, logoutUser, loggedInNav, resetErrorMsg}) {

    const [isMobile, setIsMobile] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    useEffect(() => {

        if (window.screen.width < 768) {
            setIsMobile(true);
        }
        const windowSizeChangeListener = (e) => {
            if (e.matches) {
                setIsMobile(false);
                setShowSideBar(false);
            } else {
                setIsMobile(true);
            }
        }
        window.matchMedia("(min-width: 768px)").addEventListener('change', windowSizeChangeListener);
        return () => {
            window.removeEventListener('change', windowSizeChangeListener);
        };
    }, []);

    function toggleSideBar() {
        setShowSideBar(!showSideBar);
    }

    return (
        <>
            <header className="header">
                {isMobile && (
                    <>
                        <div className="header__left">
                            <FontAwesomeIcon icon={faBars} onClick={toggleSideBar} size="xl"/>
                            {showSideBar && <Navbar user={user} loggedInNav={loggedInNav} logoutUser={logoutUser}
                                                    resetErrorMsg={resetErrorMsg}/>}
                        </div>
                        {user && (
                            <div className="header__welcome">
                                <p>Welcome back,</p>
                                <p>{user.username}</p>
                            </div>
                        )}

                    </>

                )}

                {!isMobile && (
                    <>
                        <Navbar user={user} loggedInNav={loggedInNav} logoutUser={logoutUser}
                                resetErrorMsg={resetErrorMsg}/>
                        {user && (
                            <div className="header__welcome">
                                <p>Welcome back,</p>
                                <p>{user.username}</p>
                            </div>
                        )}
                    </>
                )}

            </header>
        </>
    )
}