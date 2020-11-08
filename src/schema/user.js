import { User, UserTC } from "../models/user";
import { authMiddleware } from "../utils/authenticationHelper";
import * as _ from "lodash";
import { createJwt } from "../utils/jwtUtil";
import { Roles } from "../models/roles";
const path = require("path");
const fs = require("fs");
const { GraphQLList, GraphQLObjectType, GraphQLNonNull } = require("graphql");
const { GraphQLUpload } = require("graphql-upload");
const { ApolloServer, gql } = require("apollo-server");

const AuthorizationDataSchema = `
    type AuthorizationData {
        token: String!
    }
`;

// const fileInputSchema = `
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

UserTC.addResolver({
  kind: "query",
  name: "login",
  type: AuthorizationDataSchema,

  args: {
    filter: LoginCredentialsInput,
  },
  resolve: async ({ args, context }) => {
    console.log("args", args);
    let argsForSearch = _.pick(args.filter, ["its_id"]);
    let userData = await User.findOne({ ...argsForSearch });
    console.log("data", userData);
    let isValid = userData.verifyPasswordSync(args.filter.password);
    console.log("isValid", isValid);
    // let permissionData = await Roles.findOne({type: 'Users'}, {projection: { _id: 0, permissions: 1}})
    // userData.permissions = permissionData.permissions;
    if (userData && !_.isEmpty(userData) && isValid) {
      return createJwt(userData);
    } else {
      throw "Authorization Failed";
    }
  },
});

// UserTC.addResolver({
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
  return UserTC.getResolver(query, [
    (resolve, source, args, context, info) => {
      let fixedFilters = {};
      if (context.decodedJwt.jamaat) {
        fixedFilters = {
          jamaat: context.decodedJwt.jamaat,
        };
      }
      console.log("wrapperResolver -> fixedFilters", fixedFilters);

      args.filter = { ...args.filter, ...fixedFilters };
      return authMiddleware(resolve, source, args, context, info, "User");
    },
  ]);
}

const UserQuery = {
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne"),
  userMany: UserTC.getResolver("findMany"),
  userCount: UserTC.getResolver("count"),
  userConnection: UserTC.getResolver("connection"),
  userPagination: UserTC.getResolver("pagination"),
  login: UserTC.getResolver("login"),
};

const UserMutation = {
  userCreateOne: UserTC.getResolver("createOne"),
  userCreateMany: UserTC.getResolver("createMany"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne"),
  userUpdateMany: UserTC.getResolver("updateMany"),
  userRemoveById: UserTC.getResolver("removeById"),
  userRemoveOne: UserTC.getResolver("removeOne"),
  userRemoveMany: UserTC.getResolver("removeMany"),
  //   uploadFile: UserTC.getResolver("uploadFile"),
};

export { UserQuery, UserMutation };
