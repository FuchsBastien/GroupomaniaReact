
import './App.css';

import {Routes, Route} from 'react-router-dom';
//import {createBrowserHistory} from 'history';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import Signup from './Components/Signup.js';
import SignupSuccess from './Components/SignupSuccess.js';
import Login from './Components/Login.js';
import AllArticles from './Components/AllArticles.js';
import Account from './Components/Account.js';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes on>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signupSuccess" element={<SignupSuccess/>}></Route>
        <Route path="/articles" element={<AllArticles/>}></Route>
        <Route path="/account/" element={<Account/>}></Route>
      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
