import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import server from '../index';

import generate from '../helper/verifyToken';
import {
  newUser, newUserLogIn, falseEmailLogIn, falsePasswdLogIn, falseNewUser,
  falseNewUser2, falseUserLogIn, UserRegistered,
} from "./data";

const token = generate.getToken(newUser);

chai.use(chaiHTTP);
chai.should();

describe("USER ENDPOINT TESTS", () => {

  it("Should not register a new user if the email is not valid", (done) => {
    chai.request(server)
      .post("/api/v1/auth/signup")
      .send(falseNewUser)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.property("error").eql("email must be a valid email");
        res.body.should.be.a("object");
        done();
      });
  });

  it("Should not register a new user with empty email", (done) => {
    chai.request(server)
      .post("/api/v1/auth/signup")
      .send(falseNewUser2)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.property("error").eql("email is not allowed to be empty");
        res.body.should.be.a("object");
        done();
      });
  });

  it("Should not login the user if the email is invalid", (done) => {
    chai.request(server)
      .post("/api/v1/auth/login")
      .send(falseEmailLogIn)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.have.property("status").eql(400);
        res.body.should.have.property("error").eql("invalid email");
        res.body.should.be.a("object");
        done();
      });
  });

  it('Should not login the user if the email is empty', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(falseUserLogIn)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.property("error").eql("email is not allowed to be empty");
        res.body.should.be.a("object");
        done();
      });
  });
});
