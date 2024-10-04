import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from '../components/UserList';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<UserList />, document.getElementById('root'));
});
