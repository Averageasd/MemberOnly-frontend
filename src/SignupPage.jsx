export function SignupPage({signupUser}) {
    return (
        <section>
            <h2 className="section-title">Sign up Form</h2>
            <form className="form login-signup-form" method="POST" onSubmit={signupUser} action="https://member-only-backend.vercel.app/signup">
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
        </section>
    )
}