import { Link } from 'react-router-dom';

const Post = ({ photo, title }) => {
    if (!photo.length) {
        return <h3>No Photo Flip Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {photo &&
                photo.map((photo) => (
                    <div key={photo._id} className="card mb-3">
                        <h4 className="card-header bg-primary text-light p-2 m-0">
                            {photo.photoOwner} <br />
                            <span style={{ fontSize: '1rem' }}>
                                posted this on {photo.date}
                            </span>
                        </h4>
                        <div className="card-body bg-light p-2">
                            <p>{photo.description}</p>
                        </div>
                        <Link
                            className="btn btn-primary btn-block btn-squared"
                            to={`/thoughts/${photo._id}`}
                        >
                            Join the discussion on this thought.
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default Post;
