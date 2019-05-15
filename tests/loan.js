import 'babel-polyfill';
import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../index";
import {
  newLoan,
} from './data'

chai.should();
chai.expect();
chai.use(chaiHTTP);

describe('LOAN ENDPOINT TESTS', () => {
  it('it should POST a loan', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .send({
        firstName: 'oeee',
        lastName: 'hjscr',
        email: 'erfn@gmail.com',
        status: 'pending',
        tenor: 12,
        amount: 5000
      })
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        done();
      })
  });
});

describe('GET all loans', () => {
  it('it should show all loans', (done) => {
    chai.request(server)
      .get('/api/v1/loans')

      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('GET a specific loans', () => {
  it('it should show all loans', (done) => {
    chai.request(server)
      .get('/api/v1/loans/1')

      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should show loan not found', (done) => {
    chai.request(server)
      .get('/api/v1/loans/10000')

      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Approve or Reject loan application (patch loan application)', () => {
  it('it should Approve or Reject loan application', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/1')
      .send({
        status: 'approved'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not Approve or Reject an empty status', (done) => {
    chai.request(server)
      .patch('/api/v1/loans/1')
      .send({
        status: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
