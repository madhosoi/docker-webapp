describe('MessageActionCreators', () => {

  let MessageActionCreators;
  beforeEach(() => {
    MessageActionCreators = require('../../app/actions/MessageActionCreators').default;
  });

  it('should have getStream function.', () => {
    expect(MessageActionCreators.getMessages).toBeTruthy();
  });

  it('should have sendMessage function.', () => {
    expect(MessageActionCreators.sendMessage).toBeTruthy();
  });

  it('should have selectMessageForReply function.', () => {
    expect(MessageActionCreators.selectMessageForReply).toBeTruthy();
  });
});
