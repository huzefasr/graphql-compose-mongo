import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';


const MiniUserSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username: String,
    thaali_size: {
        type: String,
        enum: ['SMALL', 'MEDIUM', 'LARGE'],
    },
})

export const FmbEventStatisticsSchema = new Schema (
    {
       event_id: {
           type: Schema.Types.ObjectId,
           ref: "Fmb_event",
           required: true
       },
       total_count:[MiniUserSchema],
       blacklisted:[MiniUserSchema],
       actual_count:[MiniUserSchema],
       false_positive: Number,
       postiive_false: Number
    },
    {
        collection: 'Fmb_event_statistics',
    }
);


FmbEventStatisticsSchema.index({ createdAt: 1, updatedAt: 1 });

export const FmbEventStatistics = mongoose.model('Fmb_event_statistics', FmbEventStatisticsSchema);
export const FmbEventStatisticsTC = composeWithMongoose(FmbEventStatistics);