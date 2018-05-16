import PropTypes from "prop-types";
import React, { Component } from "react";
import { grey300, grey600, grey900 } from "material-ui/styles/colors";
import { BorderedFlatButton002, RaisedButton003 } from "material-ui-fj/Button";
import { HorizontalLayout, VerticalLayout } from "material-ui-fj/sublayouts";
import { KeyCode } from "../../constants/AppConstants";

import MessageActionCreators from "../../actions/MessageActionCreators";

export default class StreamContent extends Component {
  static propTypes = {
    currentStream: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    }),

    replyMessageId: PropTypes.string,
    messageList: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        stream_id: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        replyMessage_id: PropTypes.string
      })
    )
  };

  static defaultProps = {
    currentStream: {},
    replyMessageId: "",
    messageList: []
  };

  static contextTypes = {
    muiFjTheme: PropTypes.object.isRequired
  };

  static getStyles(context) {
    const { palette, spacing } = context.muiFjTheme;
    const styles = {
      root: {},
      streamTitle: {
        padding: "24px 24px 16px 24px",
        fontSize: 14,
        fontWeight: 500,
        color: palette.primary1Color
      },

      streamComment: {
        marginRight: spacing.desktopGutter,
        marginBottom: spacing.desktopGutterLess,
        marginLeft: spacing.desktopGutter,
        paddingTop: spacing.desktopGutterMini,
        borderTop: `1px solid ${grey300}`,
        overflow: "visible"
      },

      streamCommentTitle: {
        paddingBottom: 4,
        fontSize: 14,
        fontWeight: 700,
        color: grey900
      },

      streamCommentBody: {
        fontSize: 16,
        fontWeight: 300,
        color: grey600,
        margin: 0
      },

      entry: {
        margin: spacing.desktopGutterLess
      },

      entryForm: {
        backgroundColor: grey300,
        fontSize: 0
      },

      userId: {
        border: "none",
        backgroundColor: "white",
        fontSize: 14,
        fontWeight: 300,
        color: grey600,
        margin: 2,
        padding: spacing.desktopGutterMini,
        boxSizing: "border-box",
        fontFamily: "inherit"
      },

      message: {
        border: "none",
        backgroundColor: "white",
        margin: "0 2px 2px 2px",
        padding: spacing.desktopGutterMini,
        boxSizing: "border-box",
        fontFamily: "inherit",
        resize: "vertical",
        overflow: "auto",
        height: 80,
        maxHeight: 200,
        fontSize: 14,
        fontWeight: 300,
        color: grey600
      },

      entrySubmit: {
        paddingLeft: spacing.desktopGutterLess,
        overflow: "visible"
      },

      replyButtonWrapper: {
        overflow: "visible"
      }
    };

    return styles;
  }

  state = { timerId: undefined };

  componentWillReceiveProps(nextProps) {
    if (this.props.currentStream._id !== nextProps.currentStream._id) {
      clearTimeout(this.state.timerId);

      this.setState({
        timerId: setInterval(() => {
          MessageActionCreators.getMessages({
            streamId: nextProps.currentStream._id,
            resolve: () => {
              // @todo handle success
            },
            // eslint-disable-next-line
            reject: error => {
              // @todo handle error
            }
          });
        }, 2000)
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerId);
  }

  handleReply(replyMessageId) {
    MessageActionCreators.selectMessageForReply({ replyMessageId });
    this.message.focus();
  }

  handleSubmitMessage = (currentStreamId, replyMessageId) => {
    MessageActionCreators.sendMessage({
      streamId: currentStreamId,
      userId: this.userId.value,
      message: this.message.value,
      replyMessageId,
      resolve: () => {
        this.message.value = "";
      },
      // eslint-disable-next-line
      reject: error => {
        // @todo handle error
      }
    });
  };

  handleEnterMessage = (event, currentStreamId, replyMessageId) => {
    if (event.ctrlKey && event.keyCode === KeyCode.ENTER) {
      MessageActionCreators.sendMessage({
        streamId: currentStreamId,
        userId: this.userId.value,
        message: this.message.value,
        replyMessageId,
        resolve: () => {
          this.message.value = "";
        },
        // eslint-disable-next-line
        reject: error => {
          // @todo handle error
        }
      });
    }
  };

  render() {
    const { currentStream, replyMessageId, messageList } = this.props;

    const styles = StreamContent.getStyles(this.context);

    const streamComments = messageList.map(message => (
      <HorizontalLayout
        key={`StreamMessage-${message._id}`}
        style={styles.streamComment}
      >
        <VerticalLayout expandable>
          <div style={styles.streamCommentTitle}>{message.user_id}</div>
          <p style={styles.streamCommentBody}>{message.message}</p>
        </VerticalLayout>
        <VerticalLayout style={styles.replyButtonWrapper}>
          <BorderedFlatButton002
            onClick={() => this.handleReply(message._id)}
            label="reply"
            tabIndex={-1}
          />
        </VerticalLayout>
      </HorizontalLayout>
    ));

    return (
      <VerticalLayout expandable>
        <VerticalLayout style={styles.streamTitle}>
          {currentStream.name}
        </VerticalLayout>
        <VerticalLayout alignY="top" expandable>
          {streamComments}
        </VerticalLayout>
        <HorizontalLayout style={styles.entry}>
          <VerticalLayout expandable style={styles.entryForm}>
            <input
              type="text"
              ref={component => {
                this.userId = component;
              }}
              placeholder={"Name"}
              style={styles.userId}
              tabIndex={0}
            />

            <textarea
              ref={component => {
                this.message = component;
              }}
              placeholder={"Message"}
              style={styles.message}
              tabIndex={0}
              onKeyDown={event =>
                this.handleEnterMessage(
                  event,
                  currentStream._id,
                  replyMessageId
                )}
            />
          </VerticalLayout>
          <VerticalLayout style={styles.entrySubmit}>
            <RaisedButton003
              label="post"
              onClick={() =>
                this.handleSubmitMessage(currentStream._id, replyMessageId)}
              tabIndex={0}
            />
          </VerticalLayout>
        </HorizontalLayout>
      </VerticalLayout>
    );
  }
}
