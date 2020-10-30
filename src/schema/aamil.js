import {AamilSahebTC} from '../models/aamil_saheb';

const AamilSahebQuery = {
    aamil_sahebs: AamilSahebTC.getResolver('findMany'),
    aamil_sahebByJamaat: AamilSahebTC.getResolver('findOne'),
};

const AamilSahebMutation = {
    createAamilSaheb: AamilSahebTC.getResolver('createOne'),
    // transferAamil_saheb: transferAamil(), //TODO yet to be overwritten.
    editAamil_saheb: AamilSahebTC.getResolver('updateById'),
};

export { AamilSahebQuery, AamilSahebMutation };