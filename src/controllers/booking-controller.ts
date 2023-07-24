import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const booking = bookingService.getBookingByUserId(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const newBooking = await bookingService.createNewBooking(userId, roomId);
    return res.status(httpStatus.OK).send(newBooking);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'BadRequestError') return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;
  try {
    const newBooking = await bookingService.updateBooking(userId, roomId, +bookingId);
    return res.status(httpStatus.OK).send(newBooking);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'BadRequestError') return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
