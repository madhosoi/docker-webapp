describe('StreamActionCreators', () => {

  let StreamActionCreators;
  beforeEach(() => {
    StreamActionCreators = require('../../app/actions/StreamActionCreators').default;
  });

  it('should have getStreamList function.', () => {
    expect(StreamActionCreators.getStreamList).toBeTruthy();
  });

  it('should have createStream function.', () => {
    expect(StreamActionCreators.createStream).toBeTruthy();
  });

  it('should have selectStream function.', () => {
    expect(StreamActionCreators.selectStream).toBeTruthy();
  });

});
