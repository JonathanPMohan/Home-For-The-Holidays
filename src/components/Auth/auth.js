import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './auth.scss';

import google from './google.png';

const loginButton = () => {
  const domString = `
  <button id="google-auth" class="btn btn-secondary">
  <img src="${google}"/>
  </button>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
