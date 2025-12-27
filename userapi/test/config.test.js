const { expect } = require('chai');

describe('Configuration Tests', () => {
  it('should have default port configuration', () => {
    const defaultPort = process.env.PORT || 3000;
    expect(defaultPort).to.be.oneOf([3000, '3000']);
  });

  it('should have Redis host configuration', () => {
    const redisHost = process.env.REDIS_HOST || '127.0.0.1';
    expect(redisHost).to.be.a('string');
    expect(redisHost.length).to.be.greaterThan(0);
  });

  it('should have Redis port configuration', () => {
    const redisPort = process.env.REDIS_PORT || 6379;
    expect(parseInt(redisPort)).to.be.a('number');
    expect(parseInt(redisPort)).to.be.greaterThan(0);
  });
});
