var express = require('express');
var router = express.Router();

//---------------------------------------------------------------------------------------------
// start of copy/paste from redhat.com: https://developers.redhat.com/blog/2018/12/21/monitoring-node-js-applications-on-openshift-with-prometheus/
// Use the prom-client module to expose our metrics to Prometheus
const client = require('prom-client');
 
// enable prom-client to expose default application metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
 
// define a custom prefix string for application metrics
collectDefaultMetrics({ prefix: 'my_homeworkapp:' });
 
// a custom histogram metric which represents the latency
// of each call to our API /api/greeting.
const histogram = new client.Histogram({
  name: 'my_homeworkapp:http_duration',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['operation', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500]
});

// end of copy/paste from redhat.com
//---------------------------------------------------------------------------------------------

router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Homework Express App Index page' });
});

router.get('/add', function(req, res, next) {
  let parsedParams = checkParams(req, res, "add")
  const end = histogram.startTimer(); // starts timer and returns a callback function to be called at the end  
  let result = parsedParams.a + parsedParams.b
  end({ operation: "add", 'status_code': 200 });
  res.status(200).json( {result: result} );
});

router.get('/subtract', function(req, res, next) {
  let parsedParams = checkParams(req, res, "subtract")
  const end = histogram.startTimer(); // starts timer and returns a callback function to be called at the end  
  let result = parsedParams.a - parsedParams.b
  end({ operation: "subtract", 'status_code': 200 });
  res.status(200).json( {result: result} );
});

router.get('/division', function(req, res, next) {
  let parsedParams = checkParams(req, res, "division")
  const end = histogram.startTimer(); // starts timer and returns a callback function to be called at the end  
  let result = parsedParams.a / parsedParams.b
  end({ operation: "division", 'status_code': 200 });
  res.status(200).json( {result: result} );
});

router.get('/random', function(req, res, next) {
  let parsedParams = checkParams(req, res, "random")
  const end = histogram.startTimer(); // starts timer and returns a callback function to be called at the end  
  let result = []
  for(i=0; i< parsedParams.a; i++) { 
    result[i] = Math.random()
  }
  end({ operation: "random", 'status_code': 200 });
  res.status(200).json( { result: result });
});

router.get('/readiness', function(req, res, next) {
  console.log('readiness...')
  res.status(200).json( { result: "I am ready!" });
});

router.get('/liveness', function(req, res, next) {
  console.log('liveness...')
  res.status(200).json( { result: "I am healty and happy!" });
});

function checkParams(req, res, operation) {
  let a = req.query.a
  let b = req.query.b

  console.log(`checking parameters. operation: ${operation}, param A: ${a}, param B: ${b}`)

  if(!a && operation === "random" ) {
    return { a: 10 } // return 10 as default
  }

  if(!a)
    res.status(422).json( {result: "the parameter A is not defined"} );

  let an = parseInt(a)
  if(isNaN(an))
    res.status(422).json( {result: "the parameter A is not an integer"} );
  
  if(operation === "random") // random needs only one param, so we do not check b
    return { a: an }

  if(!b)
    res.status(422).json( {result: "the parameter B is not defined"} );

  let bn = parseInt(b)
  if(isNaN(bn))
    res.status(422).json( {result: "the parameter B is not an integer"} );
  
  if(operation === "division" && bn === 0)
    res.status(422).json( {result: "division by zero"} );

  return { a: an, b: bn }
}

router.get('/metrics', (request, response) => {
  response.set('Content-Type', client.register.contentType);
  response.send(client.register.metrics());
});
module.exports = router;
