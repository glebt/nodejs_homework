let request = require("request");

let base_url = "http://localhost:3000"

describe("GETers for my NodeJS Homework application", function() {

    it("API returns status code 200", function(done) {
        request.get(base_url, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
    });


    it("API response to health check", function(done) {
      request.get(base_url + "/liveness", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });    

    it("API response to readiness check", function(done) {
      request.get(base_url + "/readiness", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });    

    it("API /metrics returns status code 200", function(done) {
      request.get(base_url + "/metrics", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });    

    // resposnes are JSON
    it("API /random response should be valid json", function(done) {
      request.get(base_url + "/random", function(error, response, body) {
          expect(() => {
              JSON.parse(body);
          }).not.toThrow();
          done();
      });
    });    

    it("API /add response should be valid json", function(done) {
      request.get(base_url + "/add?a=2&b=3", function(error, response, body) {
          expect(() => {
              JSON.parse(body);
          }).not.toThrow();
          done();
      });
    });    

    it("API /subtract response should be valid json", function(done) {
      request.get(base_url + "/subtract?a=3&b=2", function(error, response, body) {
          expect(() => {
              JSON.parse(body);
          }).not.toThrow();
          done();
      });
    });    

    it("API /division response should be valid json", function(done) {
      request.get(base_url + "/division?a=3&b=2", function(error, response, body) {
          expect(() => {
              JSON.parse(body);
          }).not.toThrow();
          done();
      });
    });    

    // random
    it("API /random returns 10 numbers by default", function(done) {
      request.get(base_url + "/random", function(error, response, body) {
          resultJSON = JSON.parse(body);
          let numbers = resultJSON.result
          expect(numbers.length).toBe(10)
          done();
      });
    });     

    it("API /random?a=6 returns 6 numbers", function(done) {
      request.get(base_url + "/random?a=6", function(error, response, body) {
          resultJSON = JSON.parse(body);
          let numbers = resultJSON.result
          expect(numbers.length).toBe(6)
          done();
      });
    });     

    // add
    it("API /add?a=1&b=1 returns 2", function(done) {
      request.get(base_url + "/add?a=1&b=1", function(error, response, body) {
          let result = parseInt( JSON.parse(body).result );
          expect(result).toBe(2)
          done();
      });
    });     

    // subtract
    it("API /subtract?a=1&b=1 returns 0", function(done) {
      request.get(base_url + "/subtract?a=1&b=1", function(error, response, body) {
          let result = parseInt( JSON.parse(body).result );
          expect(result).toBe(0)
          done();
      });
    });     

  });
 
