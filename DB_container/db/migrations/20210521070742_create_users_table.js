exports.up = async function (knex) {
  if (await knex.schema.hasTable('users')) return;
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('surname')
    table.string('email').notNullable()
    table.string('phone')
    table.string('password').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('users')
};
