// import 'babel-polyfill';
// import chai from "chai";
// import chaiHTTP from "chai-http";
// import server from "../index";
// import {
//   newLoan,
// } from './data'
//
// chai.should();
// chai.expect();
// chai.use(chaiHTTP);
//
//
//
// describe('Approve or Reject loan application (patch loan application)', () => {
//   it('it should not Approve or Reject an empty status', (done) => {
//     chai.request(server)
//       .patch('/api/v1/loans/1')
//       .send({
//         status: ''
//       })
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a('object');
//         done();
//       });
//   });
// });
// import 'babel-polyfill';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../index';
// import pool from '../models/db';
//
// let token = '';
//
// describe('Loan', () => {
//
//   describe('GET all Loan', () => {
//     it('First login the user to generate the token', (done) => {
//       chai.request(server)
//         .post('/api/v1/auth/login')
//         .send({
//           email: 'karemera@gmail.com',
//           password: '1234578',
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           token = res.body.data[0].token;
//           done();
//         });
//     });
//
//     it('it should show all loan', (done) => {
//       chai.request(server)
//         .get('/api/v1/loans')
//         .set('Authorization', token)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });
// });
