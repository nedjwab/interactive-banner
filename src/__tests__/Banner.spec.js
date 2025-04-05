import React from 'react';
import { render, screen, fireEvent,within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

jest.mock('../../assets/images/coffee.jpg', () => 'coffee.jpg');

describe('App Component', () => {
  test('renders the banner with default content', () => {
    render(<App />);
    expect(screen.getByText((content, element) => 
      content.includes('Perfect')
    )).toBeInTheDocument();
  });

  test('updates banner title and description on input change', () => {
    render(<App />);
  
    const titleInput = screen.getByPlaceholderText('Enter banner title');
    const descriptionInput = screen.getByPlaceholderText('Enter banner description');
  
    fireEvent.change(titleInput, { target: { value: 'New Banner Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'New banner description' } });
  
    const banner = screen.getByText('New Banner Title').closest('.banner-text');
  
    expect(banner).toBeInTheDocument();
  
    expect(within(banner).getByText('New banner description')).toBeInTheDocument();
  });

  test('shows error when banner title is empty', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter banner title/i);
    fireEvent.change(input, { target: { value: ' ' } });
    expect(screen.getByText(/title should be more than 0 characters/i)).toBeInTheDocument();
  });
  
  
});
