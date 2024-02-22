export function Dashboard({user, messages, deleteMessage}) {
    return (
        <>
            <h2 className="section-title">All posts</h2>
            <ul className="message-list">
                {messages.map((message) => {
                    return (
                        <li className="message-list__message" key={message.id}>
                            <form
                                method="POST"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    deleteMessage(message.id)
                                }}
                                action={`https://member-only-backend.vercel.app/message/delete/${message.id}`}
                            >
                                <input type="hidden" value={message.title} name="title"/>
                                <input type="hidden" value={message.message} name="message"/>
                                {user && user.member
                                    && (
                                        <>
                                            <p className="message-list__author">
                                                posted by {message.author.username === user.username ? (
                                                <span>you</span>) : (<span>{message.author.username}</span>)}
                                            </p>
                                            <p className="message-list__date">{message.date}</p>
                                            <hr/>
                                        </>
                                    )}
                                <h3>{message.title}</h3>
                                <p>{message.message}</p>
                                {
                                    (user && user.admin)
                                    &&
                                    <button className="delete-btn" type="submit">
                                        Delete
                                    </button>
                                }
                            </form>
                        </li>
                    )
                })}
            </ul>

        </>
    )
}