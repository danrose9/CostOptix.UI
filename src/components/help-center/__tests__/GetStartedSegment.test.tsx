import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GetStartedSegment } from '../GetStartedSegment';
import { DocumentContext } from '../../context/DocumentContext';

// Mock for the context provider value
const mockSetDocumentId = jest.fn();

describe('GetStartedSegment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Wrap GetStartedSegment in a mock provider
  const renderWithDocumentContext = (props: any) => {
    return render(
      <DocumentContext.Provider
        value={{ setDocumentId: mockSetDocumentId, documentId: '', category: '', setCategory: () => {} }}
      >
        <GetStartedSegment {...props} />
      </DocumentContext.Provider>
    );
  };

  it('renders with heading, description, and image', () => {
    const props = {
      heading: 'Test Heading',
      description: 'Test Description',
      image: 'test-image.jpg',
    };

    renderWithDocumentContext(props);

    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('calls setDocumentId with correct ID on click', () => {
    const props = {
      heading: 'Test Heading',
      description: 'Test Description',
      image: 'test-image.jpg',
      documentId: '123',
    };

    renderWithDocumentContext(props);

    const segment = screen.getByTestId('segment');
    fireEvent.click(segment);
    expect(mockSetDocumentId).toHaveBeenCalledWith('123');
  });

  it('calls setDocumentId with empty string if no documentId prop is provided', () => {
    const props = {
      heading: 'Test Heading',
      description: 'Test Description',
      image: 'test-image.jpg',
    };

    renderWithDocumentContext(props);

    const segment = screen.getByTestId('segment');
    fireEvent.click(segment);
    expect(mockSetDocumentId).toHaveBeenCalledWith('');
  });
});
