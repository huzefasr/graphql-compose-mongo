import { User, UserTC } from '../models/user';
import { authMiddleware } from '../utils/authenticationHelper'


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
};

export { UserQuery, UserMutation };