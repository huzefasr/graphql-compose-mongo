import { User, UserTC } from '../models/user';
import { authMiddleware } from '../utils/authenticationHelper'
import * as _ from 'lodash'
import { createJwt } from '../utils/jwtUtil'
import { Roles } from '../models/roles';

const AuthorizationDataSchema = `
    type AuthorizationData {
        token: String!
    }
`

const LoginCredentialsInput = `
input LoginCredentials {
    its_id : Int!
    password: String!
} 

`


UserTC.addResolver({
    kind: 'query',
    name: 'login',
    type: AuthorizationDataSchema,

    args: {
       filter: LoginCredentialsInput
    },
    resolve: async ({ args, context }) => {
        console.log("args", args)
        let argsForSearch = _.pick(args.filter, ['its_id'])
        let userData = await User.findOne({...argsForSearch})
        console.log("data", userData)
        let isValid = userData.verifyPasswordSync(args.filter.password)
        console.log("isValid", isValid)
        let permissionData = await Roles.findOne({type: 'Users'}, {projection: { _id: 0, permissions: 1}})
        userData.permissions = permissionData.permissions;
        if(userData && !_.isEmpty(userData) && isValid){
            return createJwt(userData)
        }else{
            throw new Error({
                message: "Authorization Failed"
            })
        }
    },
})


UserTC.addResolver({
    kind: 'mutation',
    name: 'createIt',
    type: UserTC,
    args: {
        record : UserTC.getInputType()
    },
    resolve: async ({ args, context }) => {
        console.log("args", args)
        return await User.findOne({"its_id": 100}).populate('jamaat')
    },
})

function wrapperResolver(query){
    return UserTC.getResolver(query, [ (resolve, source, args, context, info) =>{

        const fixedFilters = {
            jamaat: context.decodedJwt.jamaat
        }

        args.filter = { ...args.filter, ...fixedFilters}
        return authMiddleware(resolve, source, args , context, info, 'User')
    }])
}



const UserQuery = {
    userById: wrapperResolver('findById'),
    userByIds: wrapperResolver('findByIds'),
    userOne: wrapperResolver('findOne'),
    userMany: wrapperResolver('findMany'),
    userCount: wrapperResolver('count'),
    userConnection: wrapperResolver('connection'),
    userPagination: wrapperResolver('pagination'),
    login: UserTC.getResolver('login')
};

const UserMutation = {
    userCreateOne: UserTC.getResolver('createOne'),
    userCreateMany: UserTC.getResolver('createMany'),
    userUpdateById: UserTC.getResolver('updateById'),
    userUpdateOne: UserTC.getResolver('updateOne'),
    userUpdateMany: UserTC.getResolver('updateMany'),
    userRemoveById: UserTC.getResolver('removeById'),
    userRemoveOne: UserTC.getResolver('removeOne'),
    userRemoveMany: UserTC.getResolver('removeMany'),
    createIt: UserTC.getResolver('createIt')
};

export { UserQuery, UserMutation };