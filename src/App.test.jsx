import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import App from './App';

describe('App Component', () => {
  it('renders Balaji Krishi branding', () => {
    render(<App />);
    const brandingElements = screen.getAllByText(/BALAJI KRISHI/i);
    expect(brandingElements.length).toBeGreaterThan(0);
  });

  it('renders products link in navbar', () => {
    render(<App />);
    const productsLinks = screen.getAllByText(/Products/i);
    expect(productsLinks.length).toBeGreaterThan(0);
  });
});
