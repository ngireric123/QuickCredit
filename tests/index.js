import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.expect();
chai.use(chaiHttp);

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
