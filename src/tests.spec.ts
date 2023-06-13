/* eslint-disable jest/no-disabled-tests */
describe('Tests', () => {
  it('should fail', async () => {
    expect(true).toBeFalsy();
  });

  it.skip('should be skipped', async () => {
    //
  });

  it.todo('should be todo', async () => {
    //
  });

  it.failing('should be failing', async () => {
    //
  });
});
