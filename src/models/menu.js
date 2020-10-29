import mongoose, {Schema} from 'mongoose';
import timestamps from "mongoose-timestamp";
import { composeWithMongoose} from "graphql-compose-mongoose";

export const MenuSchema = new Schema(
    {
        created_by:{
            type: Schema.Types.ObjectId,
            ref: "AamilSaheb" // change to members later
        },
        jamaat: {
            type: Schema.Types.ObjectId,
            ref: "Jamaat"
        },
        dish1:String,
        dish2:String,
        dish3:String,
        extras: String,
        roti:Boolean,
        chawal:Boolean,
        // ratings:{
            // type: Schema.Types.ObjectId,
            // ref: "Ratings"
        // },
    },
    {
        collection: "menu"
    }
);

export const Menu = mongoose.model("Menu", MenuSchema)
export const MenuTC = composeWithMongoose(Menu)