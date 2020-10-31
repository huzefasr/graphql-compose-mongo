"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTC = exports.User = exports.UserSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FamilySchema = new _mongoose.Schema({
  "name": String,
  "type": {
    type: String,
    enum: ['adult', 'child'],
    default: "adult"
  },
  "its_id": Number,
  "dob": String
});
const UserSchema = exports.UserSchema = new _mongoose.Schema({
  its_id: {
    type: Number,
    trim: true,
    required: true
  },
  password: {
    type: String,
    bcrypt: true
  },
  mobile_no: {
    type: Number,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  user_creation_status: {
    type: Boolean,
    default: true
  },
  imgurl: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: false
  },
  thaali_size: {
    type: String,
    enum: ['SMALL', 'MEDIUM', 'LARGE']
  },
  family: [FamilySchema],
  jamaat: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Jamaat'
  },
  status: {
    type: String,
    enum: ['active', 'deactive', 'suspended']
  },
  statistics: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'UserCompilation'
  }
}, {
  collection: 'users'
});
UserSchema.plugin(_mongooseTimestamp2.default);
UserSchema.plugin(require('mongoose-bcrypt'), {
  rounds: 8
});
UserSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const User = exports.User = _mongoose2.default.model('User', UserSchema);

const UserTC = exports.UserTC = (0, _graphqlComposeMongoose.composeWithMongoose)(User);