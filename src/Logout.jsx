import {Navigate} from "react-router-dom";

export function Logout({user}) {
    if (!user) {
        console.log('navigate to log in page');
        return <Navigate to="/login"/>
    } else {
        return (
            <></>
        )
    }

}