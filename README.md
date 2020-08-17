# NodeJS Homework

This is my homework for undisclosed prospective employer. 


## 1. Public github repository

## 2. Express NodeJS Webapp and RESTful server

All requested methods are implemented. The Prometheus metrics are based on https://developers.redhat.com/blog/2018/12/21/monitoring-node-js-applications-on-openshift-with-prometheus/


## 3. Add unit tests

Unit tests are implemented using `jest` framework which does not require any configuration out of the box. Simply run

```
jest
```

See https://jestjs.io/ for more info. 

## 4. Dockerize the above webservice

The `Dockerfile` is based on https://github.com/BretFisher/docker-mastery-for-nodejs/blob/master/ultimate-node-dockerfile/answer/Dockerfile which is a part of _Docker Mastery for Node.js Projects From a Docker Captain_ Udemy course by Bret Fisher. I took the course almost two years ago and follow the best practices from that cource ever since. Well, you can say that's exact copy but I can explain every line, including multi-stages, tests and what `tini` does. 

There is `SimpleDockerfile` as well. 

## 5. Create Kubernetes manifests to deploy this web service into Kubernetes
Please see the `kubernetes` folder. It assumes that Istio is installed. The `nodejs-homework` web application is configured as a virtual service. There are deployment, service, hpa manifests. 

Since Istio gateway is based on `nginx` I believe the requirement to have nginx-based ingress is met. 