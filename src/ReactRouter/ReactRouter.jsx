import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

class Home extends Component {
  render(){
    return (
      <div>
        <h1>Home!</h1>
      </div>
    );
  }
}

class Roster extends Component {
  render(){
    return (
      <div>
        <h1>Roster!</h1>
      </div>
    );
  }
}

class Header extends Component {
  render(){
    return(
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/roster'>Roster</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}


class Main extends Component {
  render(){
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/roster' component={Roster}/>
        </Switch>
      </main>
    );
  }
}


 class ReactRouter extends Component {
   render(){
     return (
       <BrowserRouter>
         <div>
          <Main />
          <Header />
         </div>
       </BrowserRouter>);
   }
}

export default ReactRouter;
