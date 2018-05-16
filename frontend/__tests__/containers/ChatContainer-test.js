jest.autoMockOff();

// @TODO Please remove this mock after implementing your application and proper tests.
jest.mock(
  '../../app/components/pages/ChatPage',
  ()=> 'ChatPage'
);

import React from 'react';
import renderer from 'react-test-renderer';

import { Dark07 } from 'material-ui-fj/styles/baseThemes';
import { getMuiFjTheme, MuiFjThemeProvider } from 'material-ui-fj/styles';

import AppDispatcher from '../../app/dispatcher/AppDispatcher';
import ChatContainer from '../../app/components/containers/ChatContainer';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const RouterContextWrapper = React.createClass({
  childContextTypes: { router: React.PropTypes.object },
  getChildContext: () => ({ router: {} }),
  render: function() {
    return (<div>{this.props.children}</div>);
  }
});

describe('ChatContainer', () => {

  beforeEach(() => {});
  afterEach(() => {});

  it('snapshot test', () => {
    const muiFjTheme = getMuiFjTheme(Dark07);
    const chatContainerSnapshot = renderer.create(
      <MuiFjThemeProvider muiFjTheme={muiFjTheme}>
        <RouterContextWrapper>
          <ChatContainer />
        </RouterContextWrapper>
      </MuiFjThemeProvider>
    );

    expect(chatContainerSnapshot.toJSON()).toMatchSnapshot();
  });
});
