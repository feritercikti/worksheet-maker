import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddOption from '../components/AddOption';
import { WorkSheetContext } from '../context/WorkSheetContext';

const mockHandleOptionChange = jest.fn();
const mockHandleAddClick = jest.fn();

const mockContext = {
  handleOptionChange: mockHandleOptionChange,
  handleAddClick: mockHandleAddClick,
};

test('renders AddOption component', () => {
  const mockId = '213213';
  render(
    <WorkSheetContext.Provider value={mockContext}>
      <AddOption id={mockId} toggleShowAddOption={jest.fn()} />
    </WorkSheetContext.Provider>
  );

  const addButton = screen.getByText('Add');
  const closeButton = screen.getByLabelText('Close');

  expect(addButton).toBeInTheDocument();
  expect(closeButton).toBeInTheDocument();

  const selectElement = screen.getByLabelText('select-option');
  fireEvent.change(selectElement, { target: { value: 'some-option' } });

  fireEvent.click(addButton);
  fireEvent.click(closeButton);

  expect(mockContext.handleAddClick).toHaveBeenCalledWith(mockId);
  expect(mockContext.handleOptionChange).toHaveBeenCalled();
});
