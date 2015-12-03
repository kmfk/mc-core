'use strict'

exports.up = function (knex, Promise) {

  return knex.schema.createTable('pipelines', function (table) {
    table.increments()
    table.integer('project_id')
    table.string('name')
    table.timestamp('created_at').nullable()
    table.timestamp('updated_at').nullable()
  })

}

exports.down = function (knex, Promise) {

  return knex.schema.dropTable('pipelines')

}