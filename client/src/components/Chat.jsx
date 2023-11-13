const Chat = ({ comments = [] }) => {
    if (!comments.length) {
        return <h3>No Comments Yet</h3>;
    }

    return (
        <>
            <h3
                className="p-5 display-inline-block"
                style={{ borderBottom: '1px dotted #1a1a1a' }}
            >
                Comments
            </h3>
            <div className="flex-row my-4">
                {comments &&
                    comments.map((comment) => (
                        <div key={comment._id} className="col-12 mb-3 pb-3">
                            <div className="p-3 bg-dark text-light">
                                <h5 className="card-header">
                                    {comment.user} commented{' '}
                                    <span style={{ fontSize: '0.825rem' }}>
                                        on {comment.date}
                                    </span>
                                </h5>
                                <p className="card-body">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Chat;
