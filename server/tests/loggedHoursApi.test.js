// loggedHoursApi.test.js
import express from 'express';
import request from 'supertest';
import { LoggedHoursApi } from 'server/LoggedHoursApi.js'; // Adjust the path

const app = express();
const mockDb = {
    collection: jest.fn(() => ({
        insertOne: jest.fn(),
        aggregate: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue([])
        })
    }))
};
app.use(express.json());
app.use('/api/loggedHours', LoggedHoursApi(mockDb));

test('POST /api/loggedHours', async () => {
    const response = await request(app)
        .post('/api/loggedHours')
        .send({ activity: 'Activity 1', hours: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hours logged successfully' });
});
