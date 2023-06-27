/* eslint-disable jest/no-disabled-tests */
describe('Tests', () => {
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should fail', async () => {
  //   expect(true).toBeFalsy();
  // });

  it.skip('should be skipped', async () => {
    //
  });

  it.todo('should be todo');
  it.failing('should be failing', async () => {
    //
    expect(true).toBeFalsy();
  });
});
