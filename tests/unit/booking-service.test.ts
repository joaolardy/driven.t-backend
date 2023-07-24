import { getBookingExample } from '../factories';
import bookingService from '../../src/services/booking-service';
import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors';

describe('getBookingByUserId function', () => {
  it('should return the user booking', async () => {
    const userId = 10;
    const booking = getBookingExample();

    jest.spyOn(bookingService, 'getBookingByUserId').mockResolvedValue(booking);

    const result = await bookingService.getBookingByUserId(userId);
    expect(bookingService.getBookingByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(booking);
  });
});
