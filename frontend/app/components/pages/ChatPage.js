import PropTypes from "prop-types";
import React, { Component } from "react";
import MediaQuery from "react-responsive"; // @see https://www.npmjs.com/package/react-responsive
import { AppBar, Drawer } from "material-ui";
import { darken } from "material-ui/utils/colorManipulator";
import { BaseLayout } from "material-ui-fj/layouts";
import { OneRowHeader } from "material-ui-fj/Header";
import { Footer003 } from "material-ui-fj/Footer";
import { Background002 } from "material-ui-fj/Background";

import StreamList from "../StreamList/StreamList";
import StreamContent from "../StreamContent/StreamContent";

export default class ChatPage extends Component {
  static propTypes = {
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    streams: PropTypes.shape({
      currentStream: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
      }),

      streamList: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    messages: PropTypes.shape({
      replyMessageId: PropTypes.string,
      messageList: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
  };

  static defaultProps = {
    style: {}
  };

  static contextTypes = {
    muiFjTheme: PropTypes.object.isRequired
  };

  static getStyles(context) {
    const { serviceBrand, palette } = context.muiFjTheme;
    const styles = {
      root: {},
      left: {
        backgroundColor: darken(palette.primary1Color, 0.3),
        width: 220
      },

      top: {
        overflow: "hidden"
      },

      title: {
        fontFamily: serviceBrand.fontFamily,
        fontSize: 16,
        fontWeight: serviceBrand.fontWeight ? serviceBrand.fontWeight : 300
      },

      drawerContainer: {
        display: "flex"
      },

      drawer: {
        display: "flex",
        flex: "1 1 auto"
      }
    };

    return styles;
  }

  state = {
    openDrawer: false
  };

  render() {
    const { style, streams, messages, ...other } = this.props;

    const styles = ChatPage.getStyles(this.context);
    const mergedRootStyle = Object.assign({}, styles.root, style);

    const title = "Playground Application";

    const top = <OneRowHeader title={title} />;

    const left = (
      <StreamList
        style={mergedRootStyle}
        currentStreamId={streams.currentStream._id}
        streamList={streams.streamList}
        {...other}
      />
    );

    const center = (
      <Background002>
        <StreamContent
          style={mergedRootStyle}
          currentStream={streams.currentStream}
          replyMessageId={messages.replyMessageId}
          messageList={messages.messageList}
          {...other}
        />
      </Background002>
    );

    const bottom = <Footer003 />;

    const appBar = (
      <div>
        <AppBar
          title={title}
          titleStyle={styles.title}
          onLeftIconButtonTouchTap={() =>
            this.setState({ openDrawer: !this.state.openDrawer })}
        />

        <Drawer
          docked={false}
          width={220}
          open={this.state.openDrawer}
          onRequestChange={open => this.setState({ openDrawer: open })}
          containerStyle={styles.drawerContainer}
          style={styles.drawer}
        >
          {left}
        </Drawer>
      </div>
    );

    return (
      <div>
        <MediaQuery minWidth={700}>
          <BaseLayout
            top={top}
            topStyle={styles.top}
            center={center}
            left={left}
            leftStyle={styles.left}
            bottom={bottom}
            style={mergedRootStyle}
            fixed
          />
        </MediaQuery>
        <MediaQuery maxWidth={699}>
          <BaseLayout
            top={appBar}
            center={center}
            bottom={bottom}
            style={mergedRootStyle}
            fixed
          />
        </MediaQuery>
      </div>
    );
  }
}
