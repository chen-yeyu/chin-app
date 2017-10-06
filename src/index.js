import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login/Login.jsx';
import LoginRedux from './Login/LoginRedux.jsx';
import registerServiceWorker from './registerServiceWorker';
import JsonTest from './JsonTest/JsonTest.jsx';
import ReactRouter from './ReactRouter/ReactRouter.jsx';

export default class AllComponent extends Component {
  render(){
    return (
    <div>
      <App /><br/>
      <LoginRedux />
    </div>
    );
  }
}

ReactDOM.render(<AllComponent />, document.getElementById('root'));

registerServiceWorker();
