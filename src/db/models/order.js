import { model, Schema } from 'mongoose';

export const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    carId: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmationToken: String,
  },
  { timestamps: true, versionKey: false },
);

export const Order = model('Order', orderSchema);
