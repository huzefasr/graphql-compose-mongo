function fetchPermission(context, entity) {
    let permision = context.decodedJwt.permission.filter((eachPermission) => eachPermission.entity === entity)
    return permision[0];
}


function authMiddleware(resolve, source, args, context, info, entity) {
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


export {
    authMiddleware
}