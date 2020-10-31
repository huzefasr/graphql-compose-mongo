import {MasterTC} from '../models/master';

function wrapperResolver(query){
    return MasterTC.getResolver(query, [ (resolve, source, args, context, info) =>{
        authMiddleware(resolve, source, args, context, info, 'Master')
    }])
}

const MasterQuery = {
    masters: wrapperResolver('findMany'),
    masterById: wrapperResolver('findById'),
};

const MasterMutation = {
    createMaster: MasterTC.getResolver("createOne"),
    editMaster: MasterTC.getResolver("updateById"),
    removeMaster: MasterTC.getResolver("removeOne"),
};

export { MasterQuery, MasterMutation };