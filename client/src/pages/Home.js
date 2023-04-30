import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StockPhoto from '../images/StockPhoto.png';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Home() {

  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <div className='home'>
      <h1 style={{textAlign: "center"}}>Stock Forum</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column"}}> {
          posts.map(post => {
            return (
              <Card key={post.id}>
                <Card.Body>
                  <Card.Title>{post.postTitle}</Card.Title>
                  <Card.Text>
                    {post.postText}
                    {post.postAuthor}
                  </Card.Text>
                    <Link
                      className="btn btn-primary btn-block btn-squared"
                    to={Auth.loggedIn() ? (`/post/${post._id}`) : (`/login`)}
                    >
                      Join the discussion on this post.
                    </Link>
                </Card.Body>
              </Card>
            )
          })
        } </div>
      )}
    </div>
  );
}
