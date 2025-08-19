// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//moch fetch globally
jest.spyOn(global, 'fetch');

// Mock IntersectionObserver on the window object
Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    //use a regular function here so that new IntersectionObserver() works like normal constructor
    value: function () {
        return {
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        };
    },
});