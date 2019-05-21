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
// describe('User', () => {
//   it('it should register a new user', (done) => {
//     chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send({
//         email: 'kanyamibwa@gmail.com',
//         firstName: 'kanyamibwa',
//         lastName: 'Alex',
//         password: '12345678',
//         status: 'unverified',
//         address: 'REMERA',
//         // isAdmin: true,
//
//       })
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.a('object');
//         done();
//       });
//   });
// });
