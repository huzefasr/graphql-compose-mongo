import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const AamilSahebSchema = new Schema(
    {
        full_name: {
            type: String,
            trim: true,
            required: true,
        },
        its_id: {
            type: Number,
            trim: true,
            required: true,
          },
    },
    {
        collection: 'aamil_saheb',
    }
);

AamilSahebSchema.plugin(timestamps);

AamilSahebSchema.index({ createdAt: 1, updatedAt: 1 });

export const AamilSaheb = mongoose.model('AamilSaheb', AamilSahebSchema);
export const AamilSahebTC = composeWithMongoose(AamilSaheb);