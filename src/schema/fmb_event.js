import {FmbEvent,FmbEventTC} from '../models/fmb_event';
import {FmbEventStatistics} from "../models/fmb_event_statistics"

export const FmbEventQuery = {
    fmb_events: FmbEventTC.getResolver('findMany'),
    fmb_event: FmbEventTC.getResolver('findById'),
};


FmbEventTC.addResolver({
    kind: 'mutation',
    name: 'createOneWrapper',
    type: FmbEventTC,
    args: {
        record : FmbEventTC.getInputType()
    },
    resolve: async ({ args, context }) => {
        console.log("args", args.record)
        let event = await FmbEvent.create(args.record)
        console.log(event.id)
        console.log(event)
        let eventStats = await FmbEventStatistics.create({event_id: event.id})
        event.statistics = eventStats.id
        event.save()
        eventStats.save()
        return event
    },
})

function wrapperResolver(query){
    return FmbEventTC.getResolver(query, [ (resolve, source, args, context, info) =>{
        const fixedFilters = {
            jamaat: context.decodedJwt.jamaat
        }

        args.filter = { ...args.filter, ...fixedFilters}
        return authMiddleware(resolve, source, args , context, info, 'User')
    }])
}


// FmbEventTC.wrapResolverResolve('findMany', next => async rp => {

//     rp.beforeRecordMutate = async (doc, resolveParams) => {
//         console.log("assssssssssssss",doc)
//     };
//     let doc = rp.args.record
//     console.log("data")
//     console.log(FmbEventTC.getInputType())
    
//     return next(rp);
// });


export const FmbEventMutation = {
    createFmbEvent:  FmbEventTC.getResolver("createOneWrapper"),
    editFmbEvent: FmbEventTC.getResolver("updateById"),
    removeFmbEvent: FmbEventTC.getResolver('removeOne'),
}
