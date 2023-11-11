import React, { useState } from 'react';
import "../../styles/home.css";



export const Home = () => {
  return (
    <div className="containter home-container">
      <div className="row">
        <div className="col-12">
          <h1>
            Welcome to Gamer Connection!
          </h1>
          <p>
            This is a website for gamers to connect with other gamers. Sign up today to add your gamertags and find other gamers to play with! Maybe even find some old friends! Here, at Gamer Connections we want to provide a safe place for gamers to connect and be able to update other players on any achievements they have made. Start off as a "Peasant" and with more activity, you can move all the way up to "Dark Knight!"
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;