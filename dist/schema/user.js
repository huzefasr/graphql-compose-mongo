"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMutation = exports.UserQuery = undefined;

var _user = require("../models/user");

var _authenticationHelper = require("../utils/authenticationHelper");

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

var _jwtUtil = require("../utils/jwtUtil");

var _roles = require("../models/roles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const path = require("path");

const fs = require("fs");

const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull
} = require("graphql");

const {
  GraphQLUpload
} = require("graphql-upload");

const {
  ApolloServer,
  gql
} = require("apollo-server");

const AuthorizationDataSchema = `
    type AuthorizationData {
        token: String!
    }
`; // const fileInputSchema = `
// input fileInputSchema {
//     file : File!
// }
// `;
// const FileOutputSchema = `
//     type fileSchema {
//         messege: String
//     }
// `;

const LoginCredentialsInput = `
input LoginCredentials {
    its_id : Int!
    password: String!
}
`;

_user.UserTC.addResolver({
  kind: "query",
  name: "login",
  type: AuthorizationDataSchema,
  args: {
    filter: LoginCredentialsInput
  },
  resolve: async ({
    args,
    context
  }) => {
    console.log("args", args);

    let argsForSearch = _.pick(args.filter, ["its_id"]);

    let userData = await _user.User.findOne({ ...argsForSearch
    });
    console.log("data", userData);
    let isValid = userData.verifyPasswordSync(args.filter.password);
    console.log("isValid", isValid); // let permissionData = await Roles.findOne({type: 'Users'}, {projection: { _id: 0, permissions: 1}})
    // userData.permissions = permissionData.permissions;

    if (userData && !_.isEmpty(userData) && isValid) {
      return (0, _jwtUtil.createJwt)(userData);
    } else {
      throw "Authorization Failed";
    }
  }
}); // UserTC.addResolver({
//   kind: "mutation",
//   name: "uploadFile",
//   type: FileOutputSchema,
//   args: {
//     filter: fileInputSchema,
//   },
//   resolve: async ({ args, context }) => {
//     console.log(args);
//     return { messege: "ok" };
//   },
// });
// UserTC.addResolver({
//     kind: 'mutation',
//     name: 'createIt',
//     type: UserTC,
//     args: {
//         record : UserTC.getInputType()
//     },
//     resolve: async ({ args, context }) => {
//         console.log("args", args)
//         return {messege:}
//     },
// })


function wrapperResolver(query) {
  return _user.UserTC.getResolver(query, [(resolve, source, args, context, info) => {
    let fixedFilters = {};

    if (context.decodedJwt.jamaat) {
      fixedFilters = {
        jamaat: context.decodedJwt.jamaat
      };
    }

    console.log("wrapperResolver -> fixedFilters", fixedFilters);
    args.filter = { ...args.filter,
      ...fixedFilters
    };
    return (0, _authenticationHelper.authMiddleware)(resolve, source, args, context, info, "User");
  }]);
}

const UserQuery = {
  userById: wrapperResolver("findById"),
  userByIds: wrapperResolver("findByIds"),
  userOne: wrapperResolver("findOne"),
  userMany: wrapperResolver("findMany"),
  userCount: wrapperResolver("count"),
  userConnection: wrapperResolver("connection"),
  userPagination: wrapperResolver("pagination"),
  login: _user.UserTC.getResolver("login")
};
const UserMutation = {
  userCreateOne: _user.UserTC.getResolver("createOne"),
  userCreateMany: _user.UserTC.getResolver("createMany"),
  userUpdateById: _user.UserTC.getResolver("updateById"),
  userUpdateOne: _user.UserTC.getResolver("updateOne"),
  userUpdateMany: _user.UserTC.getResolver("updateMany"),
  userRemoveById: _user.UserTC.getResolver("removeById"),
  userRemoveOne: _user.UserTC.getResolver("removeOne"),
  userRemoveMany: _user.UserTC.getResolver("removeMany") //   uploadFile: UserTC.getResolver("uploadFile"),

};
exports.UserQuery = UserQuery;
exports.UserMutation = UserMutation;