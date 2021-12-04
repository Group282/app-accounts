import React  from 'react';
import '../index.css';
import Menu from "./components/sections/Menu";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Profile from "./components/Profile";
import ListPage from "./components/ListPage";
import AboutPages from "./components/AboutPage";

const App = () => {
    return (
        <Router>
            <Menu/>
            <Switch>
                <Route path="/" exact children={<ListPage/>}/>
                <Route path="/profile/:id" children={<Profile/>}/>
                <Route path="/about" children={<AboutPages/>}/>
            </Switch>
        </Router>
    )
};

export default App;
