// import $ from 'jquery';
import 'bootstrap';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import './index.scss';

// import holidays from './images/holidays.png';
import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
// $('#holidays').attr('src', holidays);

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  loginButton();
};

initializeApp();
