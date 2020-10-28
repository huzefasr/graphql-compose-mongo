import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const JamaatSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        country: {
            type: String,
            trim: true,
            required: true,
        },
        city: {
            type: String,
            trim: true,
            required: true,
        },
        state: {
            type: String,
            trim: true,
        },
        zipcode: {
            type: String,
            trim: true,
            required: true,
        },
        address: {
            type: String,
            trim: true,
        }
    },
    {
        collection: 'jamaat',
    }
);

JamaatSchema.plugin(timestamps);

JamaatSchema.index({ createdAt: 1, updatedAt: 1 });

export const Jamaat = mongoose.model('Jamaat', JamaatSchema);
export const JamaatTC = composeWithMongoose(Jamaat);