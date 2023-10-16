import { Router } from 'express';
import {
  getAllContacts,
  getContact,
  updateContact,
  createContact,
  deleteUserContact,
} from '../../controllers/contacts';
import validate from '../../helpers';
import { createUserSchema } from '../../schemas/contactSchema';

const contactRouter = Router();
contactRouter.get('/', getAllContacts);
contactRouter.post('/', validate(createUserSchema), createContact);
contactRouter.get('/:id', getContact);
contactRouter.patch('/:id', updateContact);
contactRouter.delete('/:id', deleteUserContact);

export default contactRouter;
