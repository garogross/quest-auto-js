/**
 * @jest-environment jsdom
 */
// Import the functions to be tested
const { reserve } = require('../reserveFunctionality');

describe('reserveFunctionality', () => {
    beforeEach(() => {
        // Reset the DOM before each test
        document.body.innerHTML = `
          <div id="reservationModal" style="display: none;">
            <span class="close-button">×</span>
          </div>
          <button class="btn">Reserve</button>
        `;

        // Initialize your functionality before each test
        reserve();
    });

    // Test Suite 1: Display modal when reserve button is clicked
    test('modal displays when reserve button is clicked', () => {
        const reserveButton = document.querySelector('.btn');
        const modal = document.getElementById('reservationModal');
        
        // Simulate a click event on the reserve button
        reserveButton.click();
    
        // Check if the modal is displayed
        expect(modal.style.display).toBe('block');
    });

    // Test Suite 2: Hide modal when close button is clicked
    test('modal hides when close button is clicked', () => {
        const closeButton = document.querySelector('.close-button');
        const modal = document.getElementById('reservationModal');

        // Simulate opening the modal first
        modal.style.display = 'block';
    
        // Simulate a click event on the close button
        closeButton.click();
    
        // Check if the modal is hidden
        expect(modal.style.display).toBe('none');
    });
});

  