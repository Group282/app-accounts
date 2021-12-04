import React  from 'react';
import '../index.css';
import Main from './components/Main';
import Menu from "./components/pages/sections/Menu";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Profile from "./components/pages/Profile";
import ListPage from "./components/pages/ListPage";
import Footer from "./components/pages/sections/Footer";
import AboutPages from "./components/pages/AboutPage";

const App = () => {
    return (
        <Router>
            <Menu/>
            <Switch>
                <Route path="/list" children={<ListPage/>}/>
                <Route path="/profile/:id" children={<Profile/>}/>
                <Route path="/about" children={<AboutPages/>}/>
            </Switch>
            {/*<div>*/}
            {/*    /!*<ListPage/>*!/*/}
            {/*    <div className="wrapper">*/}
            {/*        <div className="content">*/}
            {/*            <button style={{width: 20, height: 20}}>On</button>*/}
            {/*            <Menu/>*/}
            {/*            <Switch>*/}
            {/*                <Route path="/one_user">*/}
            {/*                    <OneUserPage/>*/}
            {/*                </Route>*/}
            {/*                <Route path="/">*/}
            {/*                    <ListPage/>*/}
            {/*                </Route>*/}
            {/*                /!*<Route path="/about">*!/*/}
            {/*                /!*    <AboutPages/>*!/*/}
            {/*                /!*</Route>*!/*/}
            {/*            </Switch>*/}
            {/*        </div>*/}
            {/*        <Footer/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Router>
    )
};

export default App;
