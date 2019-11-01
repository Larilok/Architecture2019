'use strict';

let db = require('../db/db.js');

const supplier1Pool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'supply',
  user: 'supplier',
  password: 'password'
};

let base = new db(supplier1Pool);

const getQueryByCategory = (value, callback) => {
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice",\
    s."AmInStock" from inventory i join categories c on i."CategoryId" = c."Id"\
    join stock s on i."Id" = s."InventoryId"\
    where c."Name" = '${value}'`, (res) => {
      return callback(res);
  });
}

const getQueryByFeatureValue = (value, callback) => {
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice",\
  s."AmInStock" from inventory i join inventory_features if on i."Id" = if."InventoryId"\
  join stock s on i."Id" = s."InventoryId"\
  where if."Description" = '${value}'`, (res) => {
    return callback(res);
  });
}

const getQueryById = (value, callback) => {
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice",\
    s."AmInStock" from inventory i join categories c on i."CategoryId" = c."Id"\
    left join stock s on i."Id" = s."InventoryId"\
    where i."Id" = ${value}`,
  (res) => {
    return callback(res);
  });
}

const getInventory = (callback) => {
    return base.query(`select i."Id", "Name", "UnitPrice", "Description", "AmInStock" from inventory i left join stock s on i."Id" = s."InventoryId" order by i."Id"`, (res) => {
      return callback(res);
    });
}

module.exports = {
  getQueryByCategory,
  getQueryByFeatureValue,
  getQueryById,
  getInventory
}
