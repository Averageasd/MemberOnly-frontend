import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Dashboard} from "./Dashboard.jsx";
import {LoginPage} from "./LoginPage.jsx";
import {Logout} from "./Logout.jsx";
import {SignupPage} from "./SignupPage.jsx";
import {CreateMessageForm} from "./CreateMessageForm.jsx";
import {DateTime} from "luxon";
import {MembershipStatusUpdate} from "./MembershipStatusUpdate.jsx";
import {Nav} from "./Nav.jsx";

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loggedInNav, setLoggedInNav] = useState(false);
    const [loginFailMsg, setLoginFailMsg] = useState(null);
    const [signupFailMsg, setSignupFailMsg] = useState(null);
    const [messages, setMessages] = useState([]);
    const [canFetch, setCanFetch] = useState(true);
    const [secretCodeCheck, setSecretCodeCheck] = useState(true);
    const [answerSecretCode, setAnswerSecretCode] = useState(false);


    useEffect(() => {
        if (canFetch) {
            getMessages()
                .then((data) => {
                    const allMessages = [];
                    data.forEach((msg) => {
                        allMessages.push({
                            id: msg._id,
                            title: msg.title,
                            message: msg.message,
                            author: msg.author,
                            date: DateTime.fromISO(msg.date).toLocaleString(),
                        })
                    })
                    setMessages(allMessages);
                    setCanFetch(false);
                })
        }


        return () => {
            setCanFetch(false);
        }
    }, [canFetch]);

    function resetErrorMsg() {
        setLoginFailMsg(null);
        setSignupFailMsg(null);
    }

    function signupUser(e) {
        e.preventDefault();
        fetch("https://memberonly-backend-production.up.railway.app/signup", {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(getFormElements(e)),
        }).then(r => {
            return r.json();
        }).then((res) => {
            if (res.code === 200) {
                setSignupFailMsg(null);
                navigate('/login');
            } else {
                setSignupFailMsg(res.msg);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    function loginUser(e) {
        e.preventDefault();
        fetch("https://memberonly-backend-production.up.railway.app/login", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(getFormElements(e)),
        }).then(r => {
            return r.json();
        }).then(res => {
            if (res.status === 200) {
                setUser(res.user);
                setLoggedInNav(true);
                setLoginFailMsg(null);

            } else {
                setLoginFailMsg(res.msg);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    function getFormElements(e) {
        const formData = Array.from(e.target.elements);
        const serverData = {};
        for (const obj of formData) {
            if (obj.name) {
                serverData[obj.name] = obj.value;
            }
        }
        return serverData;
    }

    function logoutUser() {
        fetch("https://memberonly-backend-production.up.railway.app/logout", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then(r => {
            return r.json();
        }).then((res) => {
            setUser(res.user);
            resetErrorMsg();
            setLoggedInNav(false);
            setLoginFailMsg(false);

        }).catch((e) => {
            console.log(e);
        })
    }

    async function getMessages() {
        try {
            const apiData = await fetch("https://memberonly-backend-production.up.railway.app/message/get", {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            });
            const res = await apiData.json();
            return res.messages;
        } catch (e) {
            console.log(e);
        }
    }

    function createMessage(e) {
        e.preventDefault();
        fetch("https://memberonly-backend-production.up.railway.app/message/create", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(getFormElements(e)),
        }).then((r) => {
            setCanFetch(true);
            navigate('/dashboard');
        }).catch((e) => {
            console.log(e);
        });
    }

    function deleteMessage(id) {
        fetch(`https://memberonly-backend-production.up.railway.app/delete/${id}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        }).then((r) => {
            console.log('delete status ', r.status);
            setCanFetch(true);
            navigate('/dashboard');
        }).catch((e) => {
            console.log(e);
        });
    }

    function updateMembershipStatus(e, id) {
        fetch(`https://memberonly-backend-production.up.railway.app/member/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(getFormElements(e)),
            mode: 'cors',
            credentials: 'include'
        }).then((r) => {
            return r.json();
        }).then((res) => {
            if (res.answerGiven) {
                setUser(res.user);
                setCanFetch(true);
                navigate('/dashboard');
                setSecretCodeCheck(true);
                setAnswerSecretCode(false);
            } else {
                setAnswerSecretCode(true);
                setSecretCodeCheck(false);
            }

        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <>
            <Nav user={user} loggedInNav={loggedInNav} logoutUser={logoutUser} resetErrorMsg={resetErrorMsg}/>
            <main>
                <div className="container">
                    <Routes>
                        <Route index element={<Dashboard user={user} messages={messages}
                                                         deleteMessage={deleteMessage}/>}></Route>
                        <Route path="/dashboard" element={<Dashboard user={user} messages={messages}
                                                                     deleteMessage={deleteMessage}/>}></Route>
                        <Route path="/login" element={<LoginPage loginUser={loginUser} user={user}
                                                                 loginFailMsg={loginFailMsg}/>}></Route>
                        <Route path="/logout" element={<Logout user={user}/>}></Route>
                        <Route path="/signup"
                               element={<SignupPage signupUser={signupUser} signupFailMsg={signupFailMsg}/>}></Route>
                        <Route path="/create-message"
                               element={<CreateMessageForm createMessage={createMessage}/>}></Route>
                        <Route path="/membership-update" element={<MembershipStatusUpdate user={user}
                                                                                          updateMembershipStatus={updateMembershipStatus}
                                                                                          answerSecretCode={answerSecretCode}
                                                                                          secretCodeCheck={secretCodeCheck}/>}/>
                    </Routes>
                </div>
            </main>
        </>
    )
}

export default App
