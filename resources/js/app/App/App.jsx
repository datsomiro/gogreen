import React, {useState, useEffect, createContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from '../Home/Home.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Profile from '../Profile/Profile.jsx';
import ApiClient from '../ApiClient.jsx';
import axios from 'axios';
import GPXUploadForm from '../GPXUploadForm/GPXUploadForm'; 
import RouteDetail from '../RouteDetail/RouteDetail.jsx';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../Theme/first-theme';



export const UserContext = createContext({user: null});

export default function App() {

    const [user, setUser] = useState(null);
    
    

    const fetchUser = async () => {

        const response = await ApiClient.get('/api/user');
        const response_data = await response.json();
        
        if (response_data.id !== undefined) { 
            setUser(response_data);
        } else {
            setUser(null);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        < UserContext.Provider value={ user }>
            <ThemeProvider theme={ theme }>
                <Router>

                    <Header fetchUser={ fetchUser }/>

                    <main>
                        <Switch>
                            <Route exact path="/" children={<Home/>}/>
                            <Route path="/login" children={<Login fetchUser={ fetchUser } />}/>
                            <Route path="/register" children={<Register fetchUser={ fetchUser } />}/>
                            <Route path="/profile" children={<Profile fetchUser={ fetchUser } />}/>
                            <Route path="/new-route" children={ <GPXUploadForm /> } />
                            <Route path="/route/:id" children={<RouteDetail /> } />
                        </Switch>
                    </main>

                </Router>
            </ThemeProvider>
        </UserContext.Provider>
    )
}