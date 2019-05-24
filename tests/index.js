import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
// import pool from '../models/db';


chai.should();
chai.expect();
chai.use(chaiHttp);

let token = ' ';

describe('Home page', () => {
  it('it should open the index', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('User', () => {
  it('it should not register a new user with empty field', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: ' ',
        firstName: 'kaka',
        lastName: 'bosco',
        password: '12345678',
        status: 'unverified',
        address: 'KIMIRONKO',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not login the user with wrong email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'tugujjme@gmail.com',
        password: '12345678',
      })

      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not login the user with wrong password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'ngireric123@gmail.com',
        password: '1223',
      })

      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  describe('Login a user with data already in the database !!!', () => {
    it('it should login the user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'ngireric123@gmail.com',
          password: '12345678',
        })

        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          token = res.body.data[0].token;
          done();
        });
    });
  });
  it('it should not register a new user with existing email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'ngireric123',
        firstName: 'ngirababyeyi',
        lastName: 'erico',
        password: '12345678',
        status: 'unverified',
        address: 'REMERA',
      })

      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('RUNNING OTHER TESTS', () => {
  it('it should not register a new loan with negative Amount', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('Authorization', token)
      .send({
        email: 'ngireric123',
        amount: -3000,
        tenor: 12,
      })

      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not register a new repayment with negative paidAmount', (done) => {
    chai.request(server)
      .post('/api/v1/loans/2/repayment')
      .set('Authorization', token)
      .send({
        email: 'ngireric123',
        amount: -3000,
        tenor: 12,
      })

      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not register a new loan with negative tenor', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('Authorization', token)
      .send({
        email: 'ngireric123',
        amount: 3000,
        tenor: -12,
      })

      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should GET all loan', (done) => {
    chai.request(server)
      .get('/api/v1/loans')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should GET a specific loan', (done) => {
    chai.request(server)
      .get('/api/v1/loans/1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not GET not a loan which is not exist', (done) => {
    chai.request(server)
      .get('/api/v1/loans/908977')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
