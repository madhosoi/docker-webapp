import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container } from "flux/utils";
import ChatPage from "../pages/ChatPage";
import StreamStore from "../../stores/StreamStore";
import MessageStore from "../../stores/MessageStore";

class ChatContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static getStores() {
    return [StreamStore, MessageStore];
  }

  static calculateState() {
    return {
      streams: StreamStore.getState(),
      messages: MessageStore.getState()
    };
  }

  render() {
    return (
      <div>
        <ChatPage
          context={this.context.router}
          streams={this.state.streams.data.toJS()}
          messages={this.state.messages.data.toJS()}
          {...this.props}
        />
      </div>
    );
  }
}

export default Container.create(ChatContainer);
