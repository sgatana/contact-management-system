import type { Request, Response } from 'express';
import {
  getContactById,
  getContactByPhoneNumber,
  createContact as create,
  getContacts,
  updateContact as update,
  deleteContact,
} from '../models/contacts';
import type { Contact } from '../schemas/contactSchema';
import { decrypt, encrypt } from '../helpers';

export const createContact = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, firstName, lastName, type, isActive } =
      req.body as Contact;
    const encodedPhone = encrypt(phoneNumber);
    const existingContact = await getContactByPhoneNumber(encodedPhone);
    if (existingContact) {
      res.status(400);
      return res.json({ message: 'Contact already added' });
    }
    const contact = await create({
      email,
      phoneNumber: encodedPhone,
      firstName,
      lastName,
      type,
      isActive,
    });
    return res
      .status(201)
      .json({ ...contact, phoneNumber: decrypt(contact.phoneNumber) });
  } catch (error) {
    res.send(400);
    throw new Error(error);
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await getContacts();
    contacts.forEach((contactObj) => {
      contactObj.phoneNumber = decrypt(contactObj.phoneNumber);
    });
    return res.status(200).json(contacts);
  } catch (error) {
    res.send(400);
    throw new Error(error);
  }
};

export const getContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      res.status(404);
      return res.json({ message: 'Contact does not exist' });
    }
    return res
      .status(200)
      .json({ ...contact, phoneNumber: decrypt(contact.phoneNumber) });
  } catch (error) {
    res.send(404);
    throw new Error(error);
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedContact = req.body as Contact;
    updatedContact.phoneNumber = encrypt(updatedContact.phoneNumber);
    const contact = await update(id, updatedContact);
    res.status(200);
    res.json({ ...contact, phoneNumber: decrypt(contact.phoneNumber) });
  } catch (error) {
    res.send(400);
    throw new Error(error);
  }
};

export const deleteUserContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteContact(id);
    return res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.send(400);
    throw new Error(error);
  }
};
