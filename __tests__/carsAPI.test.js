// tests/carsApi.test.js

import { fetchCars } from '../scripts/api/carsApi';

// Mock fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ make: 'Toyota', model: 'Corolla' }]),
  })
);

test('fetchCars returns a list of cars', async () => {
  const cars = await fetchCars();
  expect(cars).toEqual([{ make: 'Toyota', model: 'Corolla' }]);
  expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/cars');
});
