import {FmbEvent,FmbEventTC} from '../models/fmb_event';
import {FmbEventStatistics} from "../models/fmb_event_statistics"
import {popElement} from "../utils/helpers"
import mongoose from "mongoose"
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
        console.log(event)
        let eventStats = await FmbEventStatistics.create({event_id: event.id})
        event.statistics = eventStats.id
        eventStats.save()
        event.save()
        return event
    },
})

const markScanInput = `
input scanInput {
    event_id: String!
    attending: Boolean!
}
`
const output = `
type scanOutput {
    status: Boolean!
}
`

FmbEventTC.addResolver({
    kind: 'mutation',
    name: 'userUpdateScanStatus',
    type: output,
    args: {
        record : markScanInput
    },
    resolve: async ({ args, context }) => {
        try{
            let user_id = context.decodedJwt._id
            user_id = "5f9d49bb3e4aae1470e63126"
            // let stats = await FmbEventStatistics.findOne({event_id: args.record.event_id})
            let id = mongoose.Types.ObjectId(user_id);
            console.log(args.record.event_id)
            if(args.record.attending){
                await FmbEventStatistics.updateOne(
                    { event_id: args.record.event_id },
                    { $pull: { blacklisted: user_id }
                    }
                );
            }else{
                 let a = await FmbEventStatistics.updateOne(
                    { event_id: args.record.event_id },
                    { $addToSet: { blacklisted: user_id}}
                );
                console.log(a)
            }
            // stats.save()
            return {status: true}
        } catch(err){
            console.log(err)
            return {status: false}
        }
        
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
    userUpdateScanStatus: FmbEventTC.getResolver("userUpdateScanStatus")
}
