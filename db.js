'use strict';

const {Pool} = require('pg');

class dbAccess {
  constructor() {}
  getInstance(details) {
    if(! dbAccess.instance) {
      dbAccess.instance = new Pool(details);
    }
    return dbAccess.instance;
  }
};

const pool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'architecture',
  user: 'postgres',
  password: 'postgres'
};

module.exports = {dbAccess, pool};
