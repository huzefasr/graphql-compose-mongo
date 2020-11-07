"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlCompose = require("graphql-compose");

var _db = require("../utils/db");

var _db2 = _interopRequireDefault(_db);

var _user = require("./user");

var _task = require("./task");

var _master = require("./master");

var _jamaat = require("./jamaat");

var _fmb_event = require("./fmb_event");

var _roles = require("./roles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
const schemaComposer = new _graphqlCompose.SchemaComposer();
schemaComposer.Query.addFields({ ..._user.UserQuery,
  // ...TaskQuery,
  ..._master.MasterQuery,
  ..._jamaat.JamaatQuery,
  ..._fmb_event.FmbEventQuery,
  ..._roles.RoleQuery
});
schemaComposer.Mutation.addFields({ ..._user.UserMutation,
  // ...TaskMutation,
  ..._master.MasterMutation,
  ..._jamaat.JamaatMutation,
  ..._fmb_event.FmbEventMutation,
  ..._roles.RoleMutation
});
exports.default = schemaComposer.buildSchema();