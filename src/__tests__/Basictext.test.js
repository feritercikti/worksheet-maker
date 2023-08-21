import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import BasicText from '../components/BasicText';
import { WorkSheetContext } from '../context/WorkSheetContext';

test('renders BasicText component', () => {
  const mockHandleDeleteOption = jest.fn();
  const mockId = '213213';
  const mockIndex = 0;
  const mockVal = 'Some text';

  render(
    <WorkSheetContext.Provider
      value={{
        handleTextChange: jest.fn(),
        handleDeleteOption: mockHandleDeleteOption,
      }}
    >
      <BasicText id={mockId} index={mockIndex} val={mockVal} />
    </WorkSheetContext.Provider>
  );

  const deleteButton = screen.getByRole('button', { name: 'Delete' });

  act(() => {
    fireEvent.click(deleteButton);
  });

  expect(mockHandleDeleteOption).toHaveBeenCalledTimes(1);
  expect(mockHandleDeleteOption).toHaveBeenCalledWith(mockId, mockIndex);
});
