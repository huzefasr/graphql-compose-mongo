"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskTC = exports.Task = exports.TaskSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TaskSchema = exports.TaskSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  }
}, {
  collection: 'tasks'
});
TaskSchema.plugin(_mongooseTimestamp2.default);
TaskSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const Task = exports.Task = _mongoose2.default.model('Task', TaskSchema);

const TaskTC = exports.TaskTC = (0, _graphqlComposeMongoose.composeWithMongoose)(Task);