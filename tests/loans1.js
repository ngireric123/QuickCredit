// import chai from "chai";
// import chaiHTTP from "chai-http";
// import server from "../index";
// import {
//  newLoan,
// } from "./dummy";
//
// chai.use(chaiHTTP);
// chai.should();
//
// describe("LOAN ENDPOINT TESTS", () => {
//   it("it should POST a loan", (done) => {
//     chai.request(server)
//       .post("/api/v1/loans")
//       .send(newLoan)
//       .set("Accept", "Application/JSON")
//       .end((err, res) => {
//         res.body.should.have.status(201);
//         res.body.should.have.property("status").eql(201);
//         res.body.should.have.property("success").eql("loan application sent");
//         res.body.should.be.a("object");
//         res.body.data.should.be.a("array");
//         done();
//       });
//   });
//
// });
