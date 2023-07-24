import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const booking = await bookingService.getBookingByUserId(userId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'ForbiddenError') return res.sendStatus(403);
    if (error.name === 'UnauthorizedError') return res.sendStatus(401);
  }
}
export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const newBooking = await bookingService.createNewBooking(userId, roomId);
    return res.status(httpStatus.OK).send({
      bookingId: newBooking.id,
    });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'BadRequestError') return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === 'ForbiddenError') return res.sendStatus(403);
    if (error.name === 'UnauthorizedError') return res.sendStatus(401);
  }
}
export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;
  try {
    const booking = await bookingService.updateBooking(userId, roomId, +bookingId);
    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'BadRequestError') return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === 'ForbiddenError') return res.sendStatus(403);
    if (error.name === 'UnauthorizedError') return res.sendStatus(401);
  }
}
