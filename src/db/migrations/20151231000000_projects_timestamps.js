'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.raw("alter table `projects` modify `created_at` timestamp not null default CURRENT_TIMESTAMP, modify `updated_at` timestamp not null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;")
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects')
}
