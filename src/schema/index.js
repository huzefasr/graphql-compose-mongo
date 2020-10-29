import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { TaskQuery, TaskMutation } from './task';
import { MasterQuery, MasterMutation } from './master'

schemaComposer.Query.addFields({
    ...UserQuery,
    ...TaskQuery,
    ...MasterQuery
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...TaskMutation,
    ...MasterMutation
});

export default schemaComposer.buildSchema();