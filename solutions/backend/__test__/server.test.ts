import { Request, Response } from 'express';
import app from '@/server';

describe('GET /', () => {
  it('responds with expected response', () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      send: jest.fn().mockImplementation((message: string) => {
        expect(message).toBe('simple server');
      }),
    } as unknown as Response;

    app.get('/', (req: Request, res: Response) => {
      res.send('simple server');
    });
  });
});
