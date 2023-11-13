import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SignUp } from "./component/signup";
import { Login } from "./component/login";
<<<<<<< Updated upstream
=======
import  AddPlatform  from "./pages/addplatform";
import { Profile } from "./pages/profile";
import  MyPlatforms  from "./pages/myplatforms";
import NewPost from "./component/newpost";
import { UserPosts } from "./component/selfposts";
import Levels from "./pages/levels";
import UserProfile from "./pages/publicprofile";
import FriendActions from "./component/friendcontrol";
>>>>>>> Stashed changes

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/log-in" />
                        <Route element={<SignUp />} path="/sign-up" />
                        <Route element={<Demo />} path="/demo" />
<<<<<<< Updated upstream
                        <Route element={<Single />} path="/single/:theid" />
=======
                        <Route element={<FriendActions />} path="/friendactions" />
                        <Route element={<UserProfile />} path="/publicprofile/:userId" />
>>>>>>> Stashed changes
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
