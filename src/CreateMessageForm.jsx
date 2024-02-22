export function CreateMessageForm({createMessage}) {
    return (
        <section>
            <h2>Create a message</h2>
            <form className="form create-message-form" method="POST" onSubmit={createMessage} action="https://member-only-backend.vercel.app/message/create">
                <div>
                    <label>
                        title
                    </label>
                    <input name="title" type="text" minLength="3" maxLength="50" required={true}/>
                </div>
                <div>
                    <label>
                        message
                    </label>
                    <textarea rows={5} name="message" minLength="3" maxLength="250" required={true}/>
                </div>
                <button className="form__button" type="submit">Submit</button>
            </form>
        </section>
    )
}