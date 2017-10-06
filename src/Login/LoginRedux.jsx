import React, { Component } from 'react';
import { Provider , connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Field, reduxForm, reducer as formReducer, SubmissionError} from 'redux-form'

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

function FetchPosts (value) {
  var mydata = value;
  fetch('http://localhost:5001/mypage/', {
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

class validateForm extends Component {
  render(){
    const {input, label, type, inline,title, meta: { asyncValidating, touched, error }} = this.props;
    return (
      <span>
        {touched && error && <span style={{"color":"green"}}> {title} {error} </span>}<br/>
        <label>{label}</label> <input {...input} className="corp-ReduxThunk-form-field" type={type} placeholder={label} />
     </span>
    );

  }

}

class loginForm extends Component {

  initialValues:{
  username: "",
  password: ""
  }

  render(){
    let this_form = this.props;
    return (<form>
            <div>
                <Field name="username" type="text" component={validateForm} label="username: " title = "ユーザ名:"/><br/>
                <Field name="password" type="password" component={validateForm} label="password: " title = "パスワード:"/>
           </div>
         </form>);
  }
}

class App extends Component {
  render(){
    return (
      <form>
        <Field name="login" component={loginForm} />
        <button type="submit" onClick={this.props.handleSubmit(clickLogin(this.props))}> Login </button><br/>
        <h1>user id:{this.props.LoginReducer.id == undefined || this.props.LoginReducer.id == "" ? "  no user" : this.props.LoginReducer.id}</h1>
        <h1>user password:{this.props.LoginReducer.password}</h1>
        <h1>user username:{this.props.LoginReducer.username}</h1>
        <h1>user first_name:{this.props.LoginReducer.first_name}</h1>
        <h1>user last_name:{this.props.LoginReducer.last_name}</h1>
        <h1>post error:{this.props.LoginReducer.message}</h1>
      </form>
    );
  }
}

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 3) {
    errors.username = 'Must be 3 characters or less';
  }

  if(!values.password) {
    errors.password = "Required";
  }else if (values.password.length > 3) {
    errors.password = 'Must be 3 characters or less';
  }
  return errors
}

const LoginState = function(state){
  return state;
}

const reduxLoginForm = reduxForm({
  form: "sample",
  validate
})(App)

const LoginForm = connect(LoginState)(reduxLoginForm)

const RootReducer = combineReducers({LoginReducer, form:formReducer});

const LoginStore = createStore(RootReducer);



class LoginRedux extends React.Component{
  render(){
    return <Provider store={LoginStore}><LoginForm /></Provider>
  }
}

export const clickLogin = (props) => (values) => {
  CleanScreen();
  var formData = new FormData();
  formData.append('username', values.username);
  formData.append('password', values.password);
  FetchPosts(formData);
}

export default LoginRedux;
