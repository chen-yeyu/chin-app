import React from 'react';
import Login from '../src/Login/Login';
import renderer from 'react-test-renderer';

test('matches snapshot', () => {
  const tree = renderer.create(
    <Login />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
