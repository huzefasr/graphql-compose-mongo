import { Master, MasterTC } from '../models/master';


function fetchPermission(context, entity) {
    let permision = context.decodedJwt.permission.filter((eachPermission) => eachPermission.entity === entity)
    return permision[0];
}


async function authMiddlewareForQueries(resolve, source, args, context, info, entity) {
    let userPermission = fetchPermission(context, entity);
    switch (info.path.typename) {
        case 'Query':
            if(userPermission.level == 1)
                return resolve(source, args, context, info)
            throw new Error('Unauthorized'); 
        case 'Mutation':
            if(userPermission.level == 2)
                return resolve(source, args, context, info)
            throw new Error('Unauthorized'); 
        default:
            console.log("Not a valid type of operation");
    }
}


function wrapperResolver(query){
    console.log("wrapperResolver -> query", query)
    return MasterTC.getResolver(query, [(resolve, source, args, context, info) =>{
        authMiddlewareForQueries(resolve, source, args, context, info, 'Master')
    }])
}


const MasterQuery = {
    Master_ById: wrapperResolver('findById'),
    Master_ByIds: MasterTC.getResolver('findByIds'),
    Master_One:  wrapperResolver('findOne'),
    Master_Many: MasterTC.getResolver('findMany',),
    Master_Count: MasterTC.getResolver('count'),
    Master_Connection: MasterTC.getResolver('connection'),
    Master_Pagination: MasterTC.getResolver('pagination'),
};

const MasterMutation = {
    Master_CreateOne: MasterTC.getResolver('createOne', [authMiddlewareForQueries]),
    Master_CreateMany: MasterTC.getResolver('createMany'),
    Master_UpdateById: MasterTC.getResolver('updateById'),
    Master_UpdateOne: MasterTC.getResolver('updateOne'),
    Master_UpdateMany: MasterTC.getResolver('updateMany'),
    Master_RemoveById: MasterTC.getResolver('removeById'),
    Master_RemoveOne: MasterTC.getResolver('removeOne'),
    Master_RemoveMany: MasterTC.getResolver('removeMany'),
};

export { MasterQuery, MasterMutation };