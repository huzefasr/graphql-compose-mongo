import { User, UserTC } from '../models/user';

async function authMiddleware(resolve, source, args, context, info) {
    if (somehowCheckAuthInContext(context)){
      return resolve(source, args, context, info);
    }
    throw new Error('You must be authorized');
  }
const UserQuery = {
    userById: UserTC.getResolver('findById',),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne',authMiddleware),
    userMany: UserTC.getResolver('findMany'),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination'),
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