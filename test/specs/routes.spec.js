import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'react-router';

import Routes from '../../src/routes';

describe('Routes', () => {
  it('contains spec with an expectation', () => {
    expect(shallow(<Routes />).find(Router)).to.have.length(1);
  });
});
