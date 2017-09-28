import React, { Component, PropTypes } from 'react';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';

const FETCH_ACTION = "fetch send";
const FETCH_FAIL = "fetch fail";
const CLEAN_SCREEN = "clean screen";

const FetchAction = function(value){
  return {
    type: FETCH_ACTION,
    value
  }
}

const FetchFail = function(value){
  return {
    type: FETCH_FAIL,
    value
  }
}

const CleanScreenAction = function(value){
  return {
    type: CLEAN_SCREEN,
    value
  }
}

function CleanScreen () {
  var data = {id:"", username:"", password:"", last_name:"", first_name:"", message:""};
  LoginStore.dispatch(CleanScreenAction(data));
}

//localhost:3030/test2
function FetchPosts (value) {
  var mydata = value;
  fetch('http://localhost:5001/mypage/react', {
    method : 'POST',
    mode : 'cors',
    body: mydata
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    LoginStore.dispatch(FetchAction(data));
  })
  .catch(function(e){
    LoginStore.dispatch(FetchFail({message: e.message}));
  })
}

const LoginReducer = function(state={}, action){
  switch (action.type) {
    case FETCH_ACTION:
      return Object.assign({}, state, action.value);
    case FETCH_FAIL:
      return Object.assign({}, state, action.value);
    case CLEAN_SCREEN:
      return Object.assign({}, state, action.value);
    default:
      return state;

  }
}

// const LoginFailReducer = function(state={}, action){
//   switch (action.type) {
//     case FETCH_FAIL:
//       return Object.assign({}, state, action.value);
//     default:
//       return state;
//
//   }
// }

class App extends Component {

  constructor(props,context){
    super(props, context);
    this.clickLogin = this.clickLogin.bind(this);
  }

  clickLogin(){
    CleanScreen();
    var formData = new FormData();
    formData.append('username', this.refs.username.value);
    formData.append('password', this.refs.password.value);
    FetchPosts(formData);
  }

  render() {
    return (
      <div className="App">
        <h1>username: </h1><input type="text" ref="username"/><br/>
        <h1>password: </h1><input type="password" ref="password"/><br/>
        <br/>
        <button onClick={this.clickLogin} style={{width: 300, height:100}}>Login</button>
        <br/>
        <h1>user id:{this.props.id == undefined || "" ? "  no user" : this.props.id}</h1>
        <h1>user password:{this.props.password}</h1>
        <h1>user username:{this.props.username}</h1>
        <h1>user first_name:{this.props.first_name}</h1>
        <h1>user last_name:{this.props.last_name}</h1>
        <h1>post error:{this.props.message}</h1>
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return state;
};

//const rootReducer = combineReducers({LoginReducer, LoginFailReducer});

const LoginStore = createStore(LoginReducer);

const ConnectedApp = connect(mapStateToProps)(App);

export default class Login extends Component {
  render(){
    return(<Provider store={LoginStore}><ConnectedApp /></Provider>);
  }

}
