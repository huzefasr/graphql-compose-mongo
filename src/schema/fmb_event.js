import {FmbEventTC} from '../models/fmb_event';

export const FmbEventQuery = {
    fmb_events: FmbEventTC.getResolver('findMany'),
    fmb_event: FmbEventTC.getResolver('findById'),
};

FmbEventTC.wrapResolverResolve('createOne', next => async rp => {

    // extend resolve params with hook
    rp.beforeRecordMutate = async (doc, resolveParams) => {
        
    };
  
    return next(rp);
  });

export const FmbEventMutation = {
    createFmbEvent:  FmbEventTC.getResolver('createOne'),
    editFmbEvent: FmbEventTC.getResolver("updateById"),
    removeFmbEvent: FmbEventTC.getResolver('removeOne'),
};
