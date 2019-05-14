import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../index';
import {
  newRepayment,
} from './dummy';

chai.use(chaiHTTP);
chai.should();

describe('POST a loan repayment', () => {
  it('it should POST a loan repayment', (done) => {
    chai.request(server)
      .post('/api/v1/loans/1/repayment')
      .send(newRepayment)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not POST a loan repayment when ID is not found', (done) => {
    chai.request(server)
      .post('/api/v1/loans/158760976/repayment')
      .send({
        paidAmount: 400
      })
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        done();
      })
  });
});

describe('GET repayment history', () => {
  it('it should get repayment history', (done) => {
    chai.request(server)
      .get('/api/v1/loans/1/repayments')

      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should show repayment history not found', (done) => {
    chai.request(server)
      .get('/api/v1/loans/19826736/repayments')

      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
