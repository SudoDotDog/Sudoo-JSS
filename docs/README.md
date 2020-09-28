# Sudoo-JSS

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-JSS.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-JSS)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-JSS/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-JSS)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fjss.svg)](https://www.npmjs.com/package/@sudoo/jss)
[![downloads](https://img.shields.io/npm/dm/@sudoo/jss.svg)](https://www.npmjs.com/package/@sudoo/jss)

JSS is a `jss` package wrap for `React`. Support using all kinds of css style within js, include pseudo class and animation.

## Install

```sh
yarn add @sudoo/jss
# Or
npm install @sudoo/jss --save
```

## Register

The JSS instance must be registered before any component mount.

```ts
import { Register } from "@sudoo/jss";
Register.register();
```
