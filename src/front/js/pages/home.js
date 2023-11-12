import React, { useState } from 'react';
import "../../styles/home.css";
import signupbanner from "../../img/signupbanner.png";



export const Home = () => {
  return (
    <div className="containter home-container">
      <div className="row">
        <div className="col-12">
          <h1 className="home-welcome">
            Welcome to Gamer Connection!
          </h1>
          <img src={signupbanner} alt="signupbanner" className="signupbanner" />
          <p>
            This is a website for gamers to connect with other gamers. Sign up today to add your gamertags and find other gamers to play with! Maybe even find some old friends! Here, at Gamer Connections we want to provide a safe place for gamers to connect and be able to update other players on any achievements they have made. Start off as a "Peasant" and with more activity, you can move all the way up to "Dark Knight!"
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;