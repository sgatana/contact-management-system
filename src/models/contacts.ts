import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    phoneNumber: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    type: { type: String, default: 'Mobile' },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ContactModel = mongoose.model('contacts', ContactSchema);

// Contact Actions
export const getContacts = () => ContactModel.find();
export const getContactById = (id: string) => ContactModel.findById(id);
export const getContactByPhoneNumber = (phoneNumber: string) =>
  ContactModel.findOne({ phoneNumber });
export const createContact = (values: Record<string, any>) =>
  ContactModel.create(values);
export const deleteContact = (id: string) => ContactModel.findByIdAndDelete(id);
export const updateContact = (id: string, values: Record<string, any>) =>
  ContactModel.findByIdAndUpdate(id, values);
