import { model, Schema } from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

userSchema.set("toJSON", {
  transform(doc, obj) {
    delete obj.password;
    return obj;
  },
});

export const User = model("user", userSchema);
