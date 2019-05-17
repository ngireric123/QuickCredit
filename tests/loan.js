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



describe('Approve or Reject loan application (patch loan application)', () => {
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
