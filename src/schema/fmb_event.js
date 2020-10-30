import {FmbEvent,FmbEventTC} from '../models/fmb_event';

export const FmbEventQuery = {
    fmb_events: wrapperResolver('findMany'),
    fmb_event: FmbEventTC.getResolver('findById'),
};


FmbEventTC.addResolver({
    kind: 'mutation',
    name: 'createFmb',
    type: FmbEventTC,
    args: {
        record : FmbEventTC.getInputType()
    },
    resolve: async ({ args, context }) => {
        console.log("args", args)
        return await FmbEvent.find({})
    },
})

function wrapperResolver(query){
    return FmbEventTC.getResolver(query, [ (resolve, source, args, context, info) =>{
        console.log(FmbEventTC.getInputTypeComposer())
        const fixedFilters = {
            jamaat: context.decodedJwt.jamaat
        }

        args.filter = { ...args.filter, ...fixedFilters}
        return authMiddleware(resolve, source, args , context, info, 'User')
    }])
}


FmbEventTC.wrapResolverResolve('findMany', next => async rp => {

    rp.beforeRecordMutate = async (doc, resolveParams) => {
        console.log("assssssssssssss",doc)
    };
    let doc = rp.args.record
    console.log("data")
    console.log(FmbEventTC.getInputType())
    
    return next(rp);
});


export const FmbEventMutation = {
    createFmbEvent:  FmbEventTC.getResolver("createOne"),
    editFmbEvent: FmbEventTC.getResolver("updateById"),
    removeFmbEvent: FmbEventTC.getResolver('removeOne'),
    createFmb: FmbEventTC.getResolver('createFmb')
}
