import PropTypes from "prop-types";
import React, { Component } from "react";
import { ListItem } from "material-ui/List";
import { darkWhite, faintBlack } from "material-ui/styles/colors";
import { darken } from "material-ui/utils/colorManipulator";
import Subheader from "material-ui/Subheader";
import { RaisedButton002 } from "material-ui-fj/Button";
import { SidebarMenu } from "material-ui-fj/SidebarMenu";
import { VerticalLayout } from "material-ui-fj/sublayouts";
import { SectionWrapper004 } from "material-ui-fj/SectionWrapper";

import StreamActionCreators from "../../actions/StreamActionCreators";
import MessageActionCreators from "../../actions/MessageActionCreators";

export default class StreamList extends Component {
  static propTypes = {
    currentStreamId: PropTypes.string,
    streamList: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
      })
    ).isRequired
  };

  static defaultProps = {
    currentStreamId: undefined
  };

  static contextTypes = {
    muiFjTheme: PropTypes.object.isRequired
  };

  static getStyles(context) {
    const { palette, spacing } = context.muiFjTheme;
    const styles = {
      root: {},
      menuTitle: {
        paddingLeft: 24,
        fontSize: 14,
        paddingTop: 8,
        lineHeight: "48px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      },

      streamList: {
        marginBottom: spacing.desktopGutterMini,
        display: "static",
        width: "100%",
        paddingTop: 0,
        paddingBottom: 0
      },

      streamListItem: {
        paddingLeft: 8,
        fontSize: 14
      },

      separator: {
        borderTop: `1px solid ${faintBlack}`
      },

      addStreamInput: {
        border: "none",
        borderRadius: 2,
        backgroundColor: darkWhite,
        fontSize: 14,
        height: 36,
        paddingLeft: spacing.desktopGutterMini,
        paddingRight: spacing.desktopGutterMini,
        marginBottom: spacing.desktopGutterMini,
        boxSizing: "border-box",
        fontFamily: "inherit"
      },

      addStream: {
        padding: spacing.desktopGutterLess,
        backgroundColor: darken(palette.primary1Color, 0.4)
      }
    };

    return styles;
  }

  state = { timerId: undefined };

  componentWillMount() {
    // push task to the stack
    const tasks = [
      () => {
        // task: select default stream
        if (!this.props.currentStreamId && this.props.streamList.length > 0) {
          // select top of stream list for default stream
          const stream = this.props.streamList[0];
          StreamActionCreators.selectStream(stream);
          MessageActionCreators.getMessages({
            streamId: stream._id,
            resolve: () => {
              // @todo handle success
            },
            // eslint-disable-next-line
            reject: error => {
              // @todo handle error
            }
          });

          return true;
        }

        return false;
      },
      () => {
        // task: reflesh stream list
        StreamActionCreators.getStreamList({
          resolve: () => {
            // @todo handle success
          },
          // eslint-disable-next-line
          reject: error => {
            // @todo handle error
          }
        });

        return false;
      }
    ];

    this.setState({
      timerId: setInterval(() => {
        tasks.forEach((task, index) => (task() ? tasks.splice(index, 1) : ""));
      }, 3000)
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerId);
  }

  handleCreateStream = () => {
    StreamActionCreators.createStream({
      name: this.newstreamName ? this.newstreamName.value : "new stream",
      resolve: stream => {
        this.newstreamName.value = "";
        MessageActionCreators.getMessages({ streamId: stream._id });
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });
  };

  handleSelectStream(stream) {
    StreamActionCreators.selectStream(stream);
    MessageActionCreators.getMessages({
      streamId: stream._id,
      resolve: () => {
        // @todo handle success
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });
  }

  render() {
    const { currentStreamId, streamList } = this.props;

    const styles = StreamList.getStyles(this.context);

    const streamListItems = streamList.map(stream => (
      <ListItem
        style={styles.streamListItem}
        onClick={() => this.handleSelectStream(stream)}
        key={`StreamList-Stream-${stream._id}`}
        value={stream._id}
        tabIndex={-1}
      >
        {stream.name}
      </ListItem>
    ));

    return (
      <SectionWrapper004>
        <VerticalLayout expandable>
          <VerticalLayout alignY="top" expandable>
            <Subheader style={styles.menuTitle}>STREAMS</Subheader>
            <SidebarMenu
              autoWidth={false}
              listStyle={styles.streamList}
              value={currentStreamId}
            >
              {streamListItems}
            </SidebarMenu>
          </VerticalLayout>
          <VerticalLayout>
            <div style={styles.separator} />
          </VerticalLayout>
          <VerticalLayout style={styles.addStream}>
            <input
              ref={component => {
                this.newstreamName = component;
              }}
              type="text"
              style={styles.addStreamInput}
              placeholder={"Stream Name"}
              tabIndex={0}
            />

            <RaisedButton002
              label="Add New Stream"
              onClick={this.handleCreateStream}
              tabIndex={0}
            />
          </VerticalLayout>
        </VerticalLayout>
      </SectionWrapper004>
    );
  }
}
