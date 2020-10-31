import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';


const FamilySchema = new Schema({
  "name": String,
  "type": {
    type: String,
    enum: ['adult', 'child'],
    default: "adult"
  },
  "its_id": Number,
  "dob": String
})


export const UserSchema = new Schema(
  {
    its_id: {
      type: Number,
      trim: true,
      required: true,
    },
    password :{
      type: String,
      bcrypt: true
    },
    mobile_no: {
      type: Number,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    user_creation_status: {
      type: Boolean,
      default: true
    },
    imgurl: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: false,
    },
    thaali_size: {
      type: String,
      enum: ['SMALL', 'MEDIUM', 'LARGE'],
    },
    family: [FamilySchema],
    jamaat: {
      type: Schema.Types.ObjectId,
      ref: 'Jamaat'
    },
    status: {
      type: String,
      enum: ['active', 'deactive', 'suspended'],
    },
    statistics: {
      type: Schema.Types.ObjectId,
      ref: 'UserCompilation'
    }
  },
  {
    collection: 'users',
  }
);

UserSchema.plugin(timestamps);
UserSchema.plugin(require('mongoose-bcrypt'),{ rounds : 8})


UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);