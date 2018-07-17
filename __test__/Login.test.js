import 'whatwg-fetch'
import React from 'react';
import Login from '../src/Login/Login';
import * as LoginAction from '../src/Login/Login';
import renderer from 'react-test-renderer';

describe('component', () =>{

  test('matches snapshot', () => {
    const tree = renderer.create(
      <Login />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

})

describe('actioin', () =>{

  it('works with resolves', () => {
    let result = LoginAction.getUserName();
    expect(result).toEqual(5)
  });
})

const TestFetch = function(url , data , callback){
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: data
  }).then(callback)
}

describe('async action', () => {

  test('fetchPosts test', () => {
    fetch('http://localhost:5001/mypage/react',{
      method : 'POST',
      mode: 'cors',
      body: {username:"cyy", password:123}
    }).then(function(res){
      expect(res).toEqual("object");
    })
  })
})


describe('TestFetch action', () => {

  test('TestFetch test', () => {
    var url = "http://localhost:5001/mypage/react";
    var data = {username:"cyy",password:123};
    TestFetch(url , data , )
  })
})
