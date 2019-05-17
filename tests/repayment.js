import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../index';
import {
  newRepayment,
} from './data';

chai.use(chaiHTTP);
chai.should();

describe('POST a loan repayment', () => {
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
