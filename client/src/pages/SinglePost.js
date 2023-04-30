import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../utils/mutations";
import { QUERY_SINGLE_POST } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import CommentList from '../components/CommentList';


import Auth from "../utils/auth";

const SinglePost = () => {

  const { postId } = useParams();
  console.log(postId)

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singlePostPageContainer">
      <div className="stockContainer">
        <div className="stockDetails">
          <h2>Stock Details TBD</h2>
        </div>
      </div>
      <div className="postContainer">
        <div className="postDetails">
          <h2><b>{post.postTitle}</b></h2>
          <p>{post.createdAt} by {post.postAuthor}</p>
          <p>{post.postText}</p>
        </div>
        <div className="commentDetails">
          <h2><b>Comments</b></h2>
            <div>
              <CommentForm postId={post._id} />
            </div>
            <div>
              <CommentList comments={post.comments} />
            </div>
        </div>
      </div>
    </div >)
}

export default SinglePost;






