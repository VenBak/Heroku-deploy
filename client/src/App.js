
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Update from './pages/Update';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import NavTabs from './components/NavTabs';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          {/* <NavTabs style={{border: "1px solid black"}}/> */}
      {/* Here we are calling the renderPage method which will return a component 
      {renderPage()} */}
          <div className="container">
            <Routes>
              <Route
                exact path="/post/:postId"
                element={<SinglePost />}
              />
              <Route
                exact path="/login"
                element={<Login />}
              />
              <Route
                exact path="/signup"
                element={<Signup />}
              />
              <Route
                exact path="/update"
                element={<Update />}
              />
              <Route
                exact path="/createpost"
                element={<CreatePost />}
              />
              <Route 
                exact path="/home" 
                element={<Home />} 
              />
              <Route 
                exact path="/about" 
                element={<About/>} 
              />
              {/* <Route 
                path="/profile" 
                element={<Profile />} 
              /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
