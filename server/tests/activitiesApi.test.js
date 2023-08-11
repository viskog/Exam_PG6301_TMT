const express = require('express');
import request from 'supertest';
import { ActivitiesApi } from 'server/activitiesApi.js'; // Adjust the path

const app = express();
const mockActivities = [{ title: 'Activity 1' }, { title: 'Activity 2' }];
const mockDb = {
    collection: jest.fn(() => ({
        find: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue(mockActivities)
        }),
        insertOne: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn()
    }))
};
app.use(express.json());
app.use('/api/activities', ActivitiesApi(mockDb));

test('GET /api/activities', async () => {
    const response = await request(app).get('/api/activities');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockActivities);
});
