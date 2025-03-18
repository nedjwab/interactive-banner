import React from 'react';
import { render, screen, fireEvent,within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

jest.mock('../../assets/images/coffee.jpg', () => 'coffee.jpg');
jest.mock('../../assets/images/cup.jpg', () => 'cup.jpg');
jest.mock('../../assets/images/gateaux.jpg', () => 'gateaux.jpg');
jest.mock('../../assets/images/sweet.jpg', () => 'sweet.jpg');

describe('App Component', () => {
  test('renders the banner with default content', () => {
    render(<App />);
    expect(screen.getByText((content, element) => 
      content.includes('Perfect')
    )).toBeInTheDocument();
  });

  test('changes time of day when clicking time buttons', () => {
    render(<App />);
    const pieTimeButton = screen.getByText('Pieoclock');
    fireEvent.click(pieTimeButton);
    expect(pieTimeButton).toHaveClass('active');
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

  test('changes background image when clicking image buttons', () => {
    render(<App />);
    const imageButtons = screen.getAllByRole('button', { name: /Travel scene/i });
    fireEvent.click(imageButtons[2]);
    expect(imageButtons[2]).toHaveClass('selected');
  });
});
