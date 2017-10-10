import React from 'react';
import Component from '../src/Component';
import renderer from 'react-test-renderer';

test('matches snapshot', () => {
  const tree = renderer.create(
    <Component />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
