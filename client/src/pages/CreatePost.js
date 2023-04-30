import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";
import { findStockSymbol } from "../utils/stocksymbol";

import Auth from "../utils/auth";

const CreatePost = () => {
    
    const apiKey = `${process.env.REACT_APP_API_KEY}`


    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
    });
    const [createPost, { error, data }] = useMutation(CREATE_POST);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        if (Auth.loggedIn()) {
            try {
                const { data } = await createPost({
                    variables: { ...formState },
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            alert("Please log in to create a post");
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="postcard col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Create Post</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{" "}
                                <Link to="/home">back to the homepage.</Link>
                            </p>
                        ) : (
                                <form onSubmit={handleFormSubmit}>
                                    <label htmlFor="company">Post Title:</label> 
                                    <input
                                        className="form-input"
                                        name="postTitle"
                                        type="text"
                                        value={formState.postTitle}
                                        onChange={handleChange}
                                        />
                                    <label htmlFor="company">Post Text:</label> 
                                    <textarea
                                        name="postText"
                                        value={formState.postText}
                                        className="form-input w-100"
                                        style={{ lineHeight: '1.5' }}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="company">Enter the name of a company to find its stock symbol:</label> 
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="companyName"
                                        name="company"
                                    />
                                    <label htmlFor="duration">Select period:</label>
                                    <br />
                                    <select id="duration" name="duration" class="form-select" aria-label="Default select example">
                                        <option value="1min">1 min</option>
                                        <option value="1day">1 day</option>
                                        <option value="1week">1 week</option>
                                        <option value="1month">1 month</option>
                                    </select>
                                    <br />
                                    <button type="button" class="btn btn-primary" onClick={() => findStockSymbol(apiKey)}>
                                        Search
                                    </button>
                                    <br />
                                        <div id="results"></div>
                                        <ul id="stockSymbols"></ul>
                                        <canvas id="myChart"></canvas>
                                    <br/>
                                    <button
                                    className="btn btn-primary btn-block"
                                    style={{ cursor: "pointer" }}
                                    type="submit"
                                >
                                    Submit
                                    </button>
                                    <br/>
                            </form>
                        )}
                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CreatePost;
