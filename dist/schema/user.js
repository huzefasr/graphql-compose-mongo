"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMutation = exports.UserQuery = undefined;

var _user = require("../models/user");

const UserQuery = {
  userById: _user.UserTC.getResolver('findById'),
  userByIds: _user.UserTC.getResolver('findByIds'),
  userOne: _user.UserTC.getResolver('findOne'),
  userMany: _user.UserTC.getResolver('findMany'),
  userCount: _user.UserTC.getResolver('count'),
  userConnection: _user.UserTC.getResolver('connection'),
  userPagination: _user.UserTC.getResolver('pagination')
};
const UserMutation = {
  userCreateOne: _user.UserTC.getResolver('createOne'),
  userCreateMany: _user.UserTC.getResolver('createMany'),
  userUpdateById: _user.UserTC.getResolver('updateById'),
  userUpdateOne: _user.UserTC.getResolver('updateOne'),
  userUpdateMany: _user.UserTC.getResolver('updateMany'),
  userRemoveById: _user.UserTC.getResolver('removeById'),
  userRemoveOne: _user.UserTC.getResolver('removeOne'),
  userRemoveMany: _user.UserTC.getResolver('removeMany')
};
exports.UserQuery = UserQuery;
exports.UserMutation = UserMutation;