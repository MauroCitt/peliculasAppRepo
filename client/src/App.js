import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import axios from 'axios';
import Enter from './components/Enter.js';
import Home from './views/Home.js';
import UserEmail from './components/UserEmail';


const URL = 'http://localhost:4000/'

function App() {

  let [loggedIn, setLoggedIn] = useState(false)
  let [userEmail, setUserEmail] = useState('')

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    const verify_token = async() => {
      if (token == null) return setLoggedIn(false);
      try{
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.post(`${URL}login/user`);
        return login(token) 
      } catch(error){
        console.error(error);
      }
    };
    verify_token();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setLoggedIn(true);
  };

  const signIn = async (email, magicLink) => {
    try {
      let res = await axios.post(`${URL}login/user`, { email, magicLink });
      if (res.data.token) {
        login(res.data.token);
      }
    } catch(e){
      alert(e);
    }
  } 


  const enterEmail = (e) => {
    setUserEmail(e.target.value)
  }

  const emailSubmit=(e) => {
    e.preventDefault();
    signIn(userEmail);
    setUserEmail('');
  }


  return (
    <div className="App">
    {<UserEmail 
    enterEmail={enterEmail} 
    emailSubmit={emailSubmit} 
    userEmail={userEmail} 
    setUserEmail={setUserEmail} />}
    <Router>
    <Routes>
    <Route
    path="/"
    element={<Home/>}
    />
    <Route
    path="verify/:email/:link"
    element={<Enter signIn={signIn} />}
    />
    </Routes>
    </Router>
    </div>
    );
  }

export default App;
