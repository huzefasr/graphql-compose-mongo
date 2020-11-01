import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { TaskQuery, TaskMutation } from './task';
import { MasterQuery, MasterMutation } from './master';
import { JamaatQuery, JamaatMutation } from "./jamaat"
import {FmbEventQuery, FmbEventMutation } from "./fmb_event"
import {RoleQuery, RoleMutation } from './roles'

schemaComposer.Query.addFields({
    ...UserQuery,
    // ...TaskQuery,
    ...MasterQuery,
    ...JamaatQuery,
    ...FmbEventQuery,
    ...RoleQuery
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    // ...TaskMutation,
    ...MasterMutation,
    ...JamaatMutation,
    ...FmbEventMutation,
    ...RoleMutation
});

export default schemaComposer.buildSchema();