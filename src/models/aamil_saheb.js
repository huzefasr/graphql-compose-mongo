import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Jamaat } from './jamaat';

export const AamilSahebSchema = new Schema (
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
            unique: true
        },
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        mobile_no: {
            type: Number,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        jamaat:{
            type: Schema.Types.ObjectId,
            ref: "Jamaat"
        }
    },
    {
        collection: 'aamil_saheb',
    }
);

AamilSahebSchema.plugin(timestamps);

AamilSahebSchema.index({ createdAt: 1, updatedAt: 1 });

export const AamilSaheb = mongoose.model('AamilSaheb', AamilSahebSchema);
export const AamilSahebTC = composeWithMongoose(AamilSaheb);