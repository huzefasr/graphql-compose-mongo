import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { FmbEventStatistics, FmbEventStatisticsTC } from './fmb_event_statistics';

export const MenuSchema = new Schema(
    {
        // created_by:{
        //     type: Schema.Types.ObjectId,
        //     ref: "AamilSaheb" // change to members later
        // },
        jamaat: {
            type: Schema.Types.ObjectId,
            ref: "Jamaat"
        },
        dish1:String,
        dish2:String,
        roti:Boolean,
        chawal:Boolean,
    },
    {
        collection: "menu"
    }
);

export const FmbEventSchema = new Schema (
    {
        date: {
            type: Date,
            required: true
        },
        start_time: {
            type: Date,
        },
        end_time: {
            type: Date,
        },
        type: {
            type: String,
            enum: ["REG","ALL"],
            default: "ALL"
        },
        menu: {
            type: MenuSchema,
            required: true
        },
        statistics: {
            type: Schema.Types.ObjectId,
            ref: "Fmb_event_statistics"
        }
    },
    {
        collection: 'fmb_event',
    }
);

FmbEventSchema.plugin(timestamps);

FmbEventSchema.index({ createdAt: 1, updatedAt: 1 });

export const FmbEvent = mongoose.model('Fmb_event', FmbEventSchema);


export const FmbEventTC = composeWithMongoose(FmbEvent);

FmbEventTC.addRelation(
    'statistics',
    {
      resolver: (_id) => {
        console.log(_id)
        return FmbEventStatisticsTC.getResolver("findOne")},
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        filter: (source) => ({
            _id: source.statistics
        })
      },
      projection: { statistics: 1 }, // point fields in source object, which should be fetched from DB
    }
  );



