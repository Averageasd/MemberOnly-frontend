import {Navigate} from "react-router-dom";
import {basedAPI} from "./apiConstant.js";

export function LoginPage({loginUser, user, loginFailMsg}) {
    if (user) {
        return <Navigate to="/"/>
    } else {

        return (
            <section>
                <h2 className="section-title">Log in form</h2>
                <form className="form login-signup-form" method="POST" onSubmit={loginUser}
                      action={`${basedAPI}/login`}>
                    <div>
                        <label>
                            username
                        </label>
                        <input name="username" type="text" minLength="3" maxLength="20" required={true}/>
                    </div>
                    <div>
                        <label>
                            password
                        </label>
                        <input name="password" type="password" minLength="8" required={true}/>
                    </div>
                    <button className="form__button" type="submit">Submit</button>
                </form>
                {loginFailMsg ? loginFailMsg : <></>}
            </section>
        )
    }
}