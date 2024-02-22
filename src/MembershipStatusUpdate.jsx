export function MembershipStatusUpdate({user, updateMembershipStatus, answerSecretCode, secretCodeCheck}) {
    return (
        <section>
            <h2 className="section-title">Secret code</h2>
            <form
                className="form update-status-form"
                method="POST"
                action={`https://member-only-backend.vercel.app/member/${user._id}`}
                onSubmit={(e) => {
                    e.preventDefault();
                    updateMembershipStatus(e, user._id)
                }}
            >
                <p>Who won the 2022 world cup?</p>
                <div>
                    <label>
                        Your answer
                    </label>
                    <input name="answer" type="text" required={true}/>
                </div>
                <button className="form__button" type="submit">confirm</button>
            </form>

            {(answerSecretCode && !secretCodeCheck) && <p>Wrong answer. please try again!!!</p>}
        </section>
    )
}