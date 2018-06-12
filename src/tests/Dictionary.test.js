import React from 'react';
import { shallow, mount } from 'enzyme';
import AddDictionary from '../components/dashboard/components/dictionary/AddDictionary';
import DictionaryModal from '../components/dashboard/components/dictionary/common/DictionaryModal';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

jest.mock('../components/dashboard/components/dictionary/AddDictionary');
jest.mock(
  '../components/dashboard/components/dictionary/common/DictionaryModal'
);

// create any initial state needed
const initialState = {};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
let store;
let wrapper;

beforeEach(() => {
  // creates the store with any initial state
  store = mockStore(initialState);
  wrapper = mount(<StaticRouter context={{}}>
    <AddDictionary store={store} />
  </StaticRouter>);
});

describe(' Dictionary Components', () => {
  it('Add Dictionary should render without crashing', () => {
    const props = {
      submit: jest.fn(),
      createDictionary: jest.fn(),
      createDictionaryUser: jest.fn()
    };
    const component = shallow(<AddDictionary props={props} />);
    expect(component).toMatchSnapshot();
  });
  it('Dictionary Modal should render without crashing', () => {
    const props = {
      submit: jest.fn(),
    };
    const component = shallow(<DictionaryModal props={props} />);
    expect(component).toMatchSnapshot();
  });
});
