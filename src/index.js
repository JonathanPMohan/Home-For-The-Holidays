import $ from 'jquery';
import 'bootstrap';
// import firebase from 'firebase/app';
import './index.scss';
import holidays from './images/holidays.png';
import navbar from './components/Navbar/navbar';

$('#holidays').attr('src', holidays);

navbar();
