import { prisma } from '@/config';

export function createBooking({ roomId, userId }: { roomId: number; userId: number }) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export function getBookingExample() {
  const booking = {
    id: 1,
    userId: 10,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: 1,
      name: 'room name',
      capacity: 5,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}
