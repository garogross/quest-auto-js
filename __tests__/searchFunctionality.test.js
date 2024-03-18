/**
 * @jest-environment jsdom
 */

// Import the functions to be tested
const { fetchBrandData, toggleSearchActive } = require('../searchFunctionality');

// Mock 'fetch' to avoid real network requests during testing
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ brand: 'Test Brand' })
  })
);

// Clear mock calls and setup DOM before each test
beforeEach(() => {
  fetch.mockClear();

  // Setup a basic DOM structure
  document.body.innerHTML = `
    <div class="search-box"></div>
    <div id="response-container"></div>
  `;
});

describe('Search Functionality', () => {
  test('toggles the active class on the search element', () => {
    const searchBox = document.querySelector('.search-box');

    // Call the function to toggle the class
    toggleSearchActive(searchBox);
    expect(searchBox.classList.contains('active')).toBeTruthy();

    // Toggle again and expect change
    toggleSearchActive(searchBox);
    expect(searchBox.classList.contains('active')).toBeFalsy();
  });

  test('fetches brand data successfully', async () => {
    const responseContainer = document.getElementById('response-container');

    // Call fetchBrandData and wait for response
    const data = await fetchBrandData('Toyota', responseContainer);

    // Check if 'fetch' was called once
    expect(fetch).toHaveBeenCalledTimes(1);
    // Check if the returned data matches the mock
    expect(data).toEqual({ brand: 'Test Brand' });
    // Verify response text is displayed in container
    expect(responseContainer.innerText).toContain('Test Brand');
  });

  // Negative test: Incorrect fetch data expactations (the test should fail)
  // test('fetches brand data successfully', async () => {
  //   const responseContainer = document.getElementById('response-container');
  //   const data = await fetchBrandData('Toyota', responseContainer);
  // // Expect data that does not match the mock
  //   expect(data).toEqual({ brand: 'Nonexistent Brand' }); // This will fail because the mock returns { brand: 'Test Brand' }.
  // });
  

  test('handles search input correctly', async () => {
    const responseContainer = document.getElementById('response-container');
    await fetchBrandData('Camry', responseContainer);

    // Use Jest's 'expect.stringContaining' for flexible parameter matching
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('Camry'), expect.anything());
  });

  test('handles year input correctly', async () => {
    const responseContainer = document.getElementById('response-container');
    await fetchBrandData('2018', responseContainer);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('2018'), expect.anything());
  });
});
