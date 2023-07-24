import enrollmentRepository from '@/repositories/enrollment-repository';
import { badRequestError, forbiddenError, notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import bookingRepository from '@/repositories/booking-repository';
import hotelRepository from '@/repositories/hotel-repository';
import roomRepository from '@/repositories/room-repository';

async function checkEnrollmentAndTicketStatus(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw notFoundError();
  }
  return ticket;
}

async function checkRoomExistAndAvaible(roomId: number) {
  const room = await roomRepository.findRoomById(roomId);
  if (!room) throw notFoundError();
  const bookingsForRoom = await bookingRepository.findBookingsByRoomId(roomId);
  if (room.capacity >= bookingsForRoom.length) throw forbiddenError();
}

async function getBookingByUserId(userId: number) {
  const existPaidTicket = await checkEnrollmentAndTicketStatus(userId);
  if (!existPaidTicket) throw notFoundError;
  const booking = await bookingRepository.findBookingByUserId(userId);
  return booking;
}

async function createNewBooking(userId: number, roomId: number) {
  if (!roomId) throw badRequestError();

  await checkEnrollmentAndTicketStatus(userId);
  await checkRoomExistAndAvaible(roomId);

  const newBooking = await bookingRepository.createBooking(userId, roomId);
  return newBooking;
}
async function updateBooking(userId: number, roomId: number, bookingId: number) {
  if (!roomId) throw badRequestError();

  await checkEnrollmentAndTicketStatus(userId);
  await checkRoomExistAndAvaible(roomId);

  const changedBooking = await bookingRepository.updateBooking(bookingId, roomId);
  return changedBooking;
}

const bookingService = { getBookingByUserId, createNewBooking, updateBooking };
export default bookingService;
