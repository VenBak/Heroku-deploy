import React from 'react';

const CommentList = ({ comments = [] }) => {
    console.log(comments);
    if (!comments.length) {
        return <h3>No Comments Yet</h3>;
    }

    return (
        <>
            <div className="commentList">
                {comments && comments.map((comment) => (
                    <div key={comment._id}>
                        <div className="singleComment">
                            <p>{comment.commentText}</p>
                            <p>{comment.createdAt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CommentList;
