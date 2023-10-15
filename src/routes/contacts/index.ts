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

const authRouter = Router();
authRouter.get('/', getAllContacts);
authRouter.post('/', validate(createUserSchema), createContact);
authRouter.get('/:id', getContact);
authRouter.patch('/:id', updateContact);
authRouter.delete('/:id', deleteUserContact);

export default authRouter;
