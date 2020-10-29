import {MasterTC} from '../models/master';

const MasterQuery = {
    masters: MasterTC.getResolver('findMany'),
    masterById: MasterTC.getResolver('findById'),
};

const MasterMutation = {
    createMaster: MasterTC.getResolver('createOne'),
    editMaster: MasterTC.getResolver("updateById"),
    removeMaster: MasterTC.getResolver('removeOne'),
};

export { MasterQuery, MasterMutation };