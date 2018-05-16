describe('MessageStore', () => {

  let Store;
  beforeEach(() => {
    Store = require('../../app/stores/MessageStore').default;
  });

  it('should data is empty in the initial state.', () => {
    const state = Store.getState();

    expect(Object.keys(state)).toEqual(['data']);
    expect(state.data.get('replyMessageId').length === 0).toBeTruthy();
    expect(state.data.get('messageList').isEmpty()).toBeTruthy();
  });
});
