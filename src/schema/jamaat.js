import {JamaatTC} from '../models/jamaat';

export const JamaatQuery = {
    jamaats: JamaatTC.getResolver('findMany'),
    jamaatById: JamaatTC.getResolver('findById'),
    testArgs: JamaatTC.getResolver('findById')
};

export const JamaatMutation = {
    createJamaat: JamaatTC.getResolver('createOne'),
    editJamaat: JamaatTC.getResolver("updateById"),
    removeJamaat: JamaatTC.getResolver('removeOne'),
};
