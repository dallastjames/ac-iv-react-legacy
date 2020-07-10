import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import { act } from 'react-dom/test-utils';
jest.mock('../services/Authentication');

describe('<Home />', () => {
  it('should be true', async () => {
    expect(true).toBeTruthy();
  });
});
