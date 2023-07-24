import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { changeBooking, getBooking, postBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken);
bookingRouter.get('/', getBooking);
bookingRouter.post('/', postBooking);
bookingRouter.put('/:bookingId', changeBooking);

export { bookingRouter };
