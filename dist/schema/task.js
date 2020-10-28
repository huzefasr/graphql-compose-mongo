"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskMutation = exports.TaskQuery = undefined;

var _task = require("../models/task");

const TaskQuery = {
  taskById: _task.TaskTC.getResolver('findById'),
  taskByIds: _task.TaskTC.getResolver('findByIds'),
  taskOne: _task.TaskTC.getResolver('findOne'),
  taskMany: _task.TaskTC.getResolver('findMany'),
  taskCount: _task.TaskTC.getResolver('count'),
  taskConnection: _task.TaskTC.getResolver('connection'),
  taskPagination: _task.TaskTC.getResolver('pagination')
};
const TaskMutation = {
  taskCreateOne: _task.TaskTC.getResolver('createOne'),
  taskCreateMany: _task.TaskTC.getResolver('createMany'),
  taskUpdateById: _task.TaskTC.getResolver('updateById'),
  taskUpdateOne: _task.TaskTC.getResolver('updateOne'),
  taskUpdateMany: _task.TaskTC.getResolver('updateMany'),
  taskRemoveById: _task.TaskTC.getResolver('removeById'),
  taskRemoveOne: _task.TaskTC.getResolver('removeOne'),
  taskRemoveMany: _task.TaskTC.getResolver('removeMany')
};
exports.TaskQuery = TaskQuery;
exports.TaskMutation = TaskMutation;