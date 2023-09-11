const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const Address = require('../models/addressModel');

const { expect } = chai;
chai.use(chaiHttp);

describe('API Test', function () {

  describe('GET /', function () {

    it('should get welcome message', function (done) {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('string');
          done();
        });
    });

  });

  describe('POST /api/addresses', function () {

    it('should add a new address', function (done) {
      const address = { title: "address 1", description: "Singapore" };
      chai.request(app)
        .post('/api/addresses')
        .send(address)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });

  });

  describe('GET /api/addresses', function () {

    beforeEach(async function() {
      await Address.deleteMany({});
    });

    it('should get 0 addresses', function (done) {
      chai.request(app)
        .get('/api/addresses')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(0);
          done();
        });
    });

    it('should get all addresses correctly', function(done) {
      const addresses = [
        { title: "address 1", description: "Singapore" },
        { title: "address 2", description: "NUS" },
      ];
      Address.insertMany(addresses)
        .then(() => {
          chai.request(app)
            .get('/api/addresses')
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('array');
              expect(res.body.length).to.equal(addresses.length);
              expect(res.body[0]).have.property('_id');
              expect(res.body[0]).have.property('title').equal(addresses[0].title);
              expect(res.body[0]).have.property('description').equal(addresses[0].description);
              expect(res.body[1]).have.property('_id');
              expect(res.body[1]).have.property('title').equal(addresses[1].title);
              expect(res.body[1]).have.property('description').equal(addresses[1].description);
              done();
            });
        });
    });

  });

});
