import React from 'react';
import Group from '../images/Group.png';

export default function About() {
    return (
      <div class="idea">
        <h1>Goals and Inspiration</h1>
        <img src= {Group}  alt="Group photo" className ="center" width="200" height="250"></img>
        <p>  Hello and Welcome to The Visible Hand. We are a dedicated and active forum passionate about navigating the treacherous Stock Market. Using our unique and intuitive tools within the website, consumers can better grasp and trade ideas regarding current stock market values. Our Team of passionate coders from The George Washington University Coding Bootcamp has made this site using innovative tools found in the competitive business environment. The encompassing goal of the Visible Hand is to help fellow nerds eager to have a safe and inclusive forum where ideas and Stock Market hypothetical conclusions can be shared and conversed. 
        </p>
        <p>“I will tell you how to become rich. Close the doors. Be fearful when others are greedy. Be greedy when others are fearful.” By Warren Buffett</p>
        <h2>Team Members</h2>
        <div>
          <ul style={{listStyleType: "none", width: "30vw", margin: "0 auto", display: "flex", justifyContent: "space-around"}}>
          <a href ="https://github.com/braddahis">
                    <li>
                        Alexander Nunez
                    </li>
                </a>
                <a href ="https://github.com/VenBak">
                    <li>
                        Andre Brahin
                    </li>
                </a>
                <a href ="https://github.com/bpmcdonell/">
                    <li>
                        Brian McDonell
                    </li>
                </a>
                <a href ="https://github.com/suvarna28">
                    <li>
                        Suvarna Jadhav
                    </li>
                </a>
          </ul>
        </div>
      </div>
    );
  }
  