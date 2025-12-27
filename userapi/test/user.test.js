const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/index');
const db = require('../src/dbClient');

describe('User API Integration Tests', () => {
  
  before(async () => {
    // Wait for Redis connection
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  beforeEach(async () => {
    // Clean up test data before each test
    const keys = await db.keys('user:test*');
    if (keys.length > 0) {
      await db.del(keys);
    }
  });

  after(async () => {
    // Clean up and close connections
    const keys = await db.keys('user:test*');
    if (keys.length > 0) {
      await db.del(keys);
    }
    await db.quit();
  });

  describe('POST /user', () => {
    it('should create a new user', (done) => {
      const user = {
        username: 'testuser1',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com'
      };

      request(app)
        .post('/user')
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'User created successfully');
          expect(res.body).to.have.property('username', 'testuser1');
          done();
        });
    });

    it('should return 400 if required fields are missing', (done) => {
      request(app)
        .post('/user')
        .send({ username: 'testuser2' })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('error', 'Missing required fields');
          done();
        });
    });

    it('should return 409 if user already exists', (done) => {
      const user = {
        username: 'testuser3',
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane.doe@example.com'
      };

      request(app)
        .post('/user')
        .send(user)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          
          request(app)
            .post('/user')
            .send(user)
            .expect(409)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.have.property('error', 'User already exists');
              done();
            });
        });
    });
  });

  describe('GET /user/:username', () => {
    it('should get an existing user', (done) => {
      const user = {
        username: 'testuser4',
        firstname: 'Bob',
        lastname: 'Smith',
        email: 'bob.smith@example.com'
      };

      request(app)
        .post('/user')
        .send(user)
        .expect(201)
        .end((err) => {
          if (err) return done(err);

          request(app)
            .get('/user/testuser4')
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.have.property('username', 'testuser4');
              expect(res.body).to.have.property('firstname', 'Bob');
              expect(res.body).to.have.property('lastname', 'Smith');
              expect(res.body).to.have.property('email', 'bob.smith@example.com');
              done();
            });
        });
    });

    it('should return 404 if user does not exist', (done) => {
      request(app)
        .get('/user/nonexistent')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('error', 'User not found');
          done();
        });
    });
  });

  describe('PUT /user/:username', () => {
    it('should update an existing user', (done) => {
      const user = {
        username: 'testuser5',
        firstname: 'Alice',
        lastname: 'Johnson',
        email: 'alice.j@example.com'
      };

      request(app)
        .post('/user')
        .send(user)
        .expect(201)
        .end((err) => {
          if (err) return done(err);

          request(app)
            .put('/user/testuser5')
            .send({ email: 'alice.johnson@example.com' })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.have.property('message', 'User updated successfully');
              done();
            });
        });
    });

    it('should return 404 if user does not exist', (done) => {
      request(app)
        .put('/user/nonexistent')
        .send({ email: 'new@example.com' })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('error', 'User not found');
          done();
        });
    });

    it('should return 400 if no fields to update', (done) => {
      const user = {
        username: 'testuser6',
        firstname: 'Charlie',
        lastname: 'Brown',
        email: 'charlie@example.com'
      };

      request(app)
        .post('/user')
        .send(user)
        .expect(201)
        .end((err) => {
          if (err) return done(err);

          request(app)
            .put('/user/testuser6')
            .send({})
            .expect(400)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.have.property('error', 'No fields to update');
              done();
            });
        });
    });
  });

  describe('DELETE /user/:username', () => {
    it('should delete an existing user', (done) => {
      const user = {
        username: 'testuser7',
        firstname: 'David',
        lastname: 'Wilson',
        email: 'david.w@example.com'
      };

      request(app)
        .post('/user')
        .send(user)
        .expect(201)
        .end((err) => {
          if (err) return done(err);

          request(app)
            .delete('/user/testuser7')
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.have.property('message', 'User deleted successfully');
              done();
            });
        });
    });

    it('should return 404 if user does not exist', (done) => {
      request(app)
        .delete('/user/nonexistent')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('error', 'User not found');
          done();
        });
    });
  });

  describe('GET /health', () => {
    it('should return health status', (done) => {
      request(app)
        .get('/health')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('status', 'healthy');
          expect(res.body).to.have.property('timestamp');
          expect(res.body).to.have.property('uptime');
          done();
        });
    });
  });
});
