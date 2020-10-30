<<<<<<< Updated upstream
import {FmbEvent,FmbEventTC} from '../models/fmb_event';
=======
import {FmbEvent, FmbEventTC} from '../models/fmb_event';
import {FmbEventStatistics} from "../models/fmb_event_statistics"
// FmbEventTC.removeField("menu")
// FmbEventTC.addFields({
//     menu_details: MenuTC
// })

>>>>>>> Stashed changes

export const FmbEventQuery = {
    fmb_events: wrapperResolver('findMany'),
    fmb_event: FmbEventTC.getResolver('findById'),
};

<<<<<<< Updated upstream

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

FmbEventTC.wrapResolverResolve('createOne', next => async rp => {
=======
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
>>>>>>> Stashed changes

    rp.beforeRecordMutate = async (doc, resolveParams) => {
        console.log("assssssssssssss",doc)
    };
    let doc = rp.args.record
    console.log("data")
    console.log(FmbEventTC.getInputType())
    
    return next(rp);
});

FmbEventTC.addResolver({
    kind: "mutation",
    name: "createOneWrapper",
    args: {record: FmbEventTC.getInputType()},
    type: FmbEventTC,
    resolve: async({args,context}) => {
        console.log(args)
        // console.log(args)
        // let fmbEvent = await FmbEvent.create(args)
        // let fmbeventStats = await FmbEventStatistics.create({
        //     event_id: fmbEvent.id,
        // })
        // fmbEvent.statistics = fmbeventStats.id
        // fmbeventStats.save()
        // fmbEvent.save()

        return await FmbEvent.find();
    }
})

export const FmbEventMutation = {
    createFmbEvent:  FmbEventTC.getResolver("createOneWrapper"),
    editFmbEvent: FmbEventTC.getResolver("updateById"),
    removeFmbEvent: FmbEventTC.getResolver('removeOne'),
    createFmb: FmbEventTC.getResolver('createFmb')
};
