const { expect } = require('chai');
const redis = require('redis');

describe('Database Connection Tests', () => {
  let client;

  before(async () => {
    client = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379
      }
    });
    
    await client.connect();
  });

  after(async () => {
    await client.quit();
  });

  it('should connect to Redis successfully', async () => {
    const result = await client.ping();
    expect(result).to.equal('PONG');
  });

  it('should be able to set and get a value', async () => {
    await client.set('test:key', 'test:value');
    const value = await client.get('test:key');
    expect(value).to.equal('test:value');
    await client.del('test:key');
  });

  it('should be able to use hash operations', async () => {
    await client.hSet('test:hash', { field1: 'value1', field2: 'value2' });
    const data = await client.hGetAll('test:hash');
    expect(data).to.deep.equal({ field1: 'value1', field2: 'value2' });
    await client.del('test:hash');
  });
});
