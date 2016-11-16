# Angular Tour Of Heroes with Webpack
[![Build Status][travis-badge]][travis-badge-url]

This repository holds the source code of the [angular.io basic tutorial](https://angular.io/docs/ts/latest/tutorial/),
complemented with the [angular.io testing tutorial](https://angular.io/docs/ts/latest/guide/testing.html) and the 
[angular.io webpack tutorial](https://angular.io/docs/ts/latest/guide/webpack.html).

It can be used as an example to understand how all the angular.io mechanisms work with each others. 

## Prerequisites

Node.js and npm are essential to Angular development. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running at least node `v4.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

## Clone this repository

```bash
git clone https://github.com/osechet/angular-tour-of-heroes-webpack
cd angular-tour-of-heroes-webpack
```

## Install npm packages

> See npm version notes above

Install the npm packages described in the `package.json` and verify that it works:

```bash
npm install
npm start
```

The `npm start` command first compiles the application, 
then uses webpack to bundle it and run a development web server.
Webpack watches for file changes.

Shut it down manually with `Ctrl-C`.

## Testing

This repository follows the [angular.io testing tutorial](https://angular.io/docs/ts/latest/guide/testing.html)
to implements the unit tests.

To run tests:

```bash
npm test
```


[travis-badge]: https://travis-ci.org/osechet/angular-tour-of-heroes-webpack.svg?branch=master
[travis-badge-url]: https://travis-ci.org/osechet/angular-tour-of-heroes-webpack
