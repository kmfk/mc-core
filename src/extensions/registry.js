'use strict'

//let validator = require('mc-extension-validator')
let glob = require('glob')

const EXT_PATH = process.cwd() + '/node_modules/mc-ext-*'

let registry = {

  _extensions: {},
  _stageTypes: [],
  _typesByFqids: {},

  /**
   * Resolve all `mc-ext-*` modules and register them
   *
   * @param  {string} dir Path mission control extensions
   */
  resolve: function resolve(dir) {
    let modules = glob.sync(dir)

    modules.forEach(module => {
      this.register(require(module))
    })
  },

  /**
   * [register provided module]
   * @param  {Object} module [Module instance]
   */
  register: function register(module) {
    if (typeof this._extensions[module.vendor] !== 'object') {
      this._extensions[module.vendor] = {}
    }

    // TODO: validate extension index

    this._extensions[module.vendor][module.id] = {
      vendor: module.vendor,
      id: module.id,
      name: module.name,
      description: module.description
    }

    this.registerStages(module)
    // TODO: register log types

  },

  registerStages: function registerStages(module) {

    if (Array.isArray(module.stages)) {

      module.stages.forEach(st => {

        // TODO: validate stage type

        // Register the stage as vendor.extension_id.stages.example
        let fqid = module.vendor + '.' + module.id + '.stages.' + st.id
        this._typesByFqids[fqid] = st
        this._stageTypes.push(st)

      })
    }

  },

  /**
   * Get an item/type from the extension via the FQID (full-qualified identifier)
   *
   * @param  {string} name [dot syntax path]
   * @return {object}      [resolved extension path]
   */
  get: function get(name) {
    if (typeof this._typesByFqids[name] !== 'undefined') {
      return this._typesByFqids[name]
    } else {
      throw new Error('Extension FQID "' + name + '" not found')
    }
  },

  /**
   * Get stage types
   *
   * @return {Array}
   */
  getStageTypes: function getStageTypes() {
    return this._stageTypes
  }

}

// Initially load extensions
registry.resolve(EXT_PATH)

module.exports = registry
