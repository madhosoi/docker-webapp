describe('StreamStore', () => {

  let Store;
  beforeEach(() => {
    Store = require('../../app/stores/StreamStore').default;
  });

  it('should data is empty in the initial state.', () => {
    const state = Store.getState();

    expect(Object.keys(state)).toEqual(['data']);
    expect(state.data.get('currentStream').isEmpty()).toBeTruthy();
    expect(state.data.get('streamList').isEmpty()).toBeTruthy();
  });
});
