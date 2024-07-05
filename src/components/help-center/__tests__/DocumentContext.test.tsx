import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DocumentProvider, useDocument } from '../../context/DocumentContext';

// Mock component that uses the useDocument hook
const MockConsumerComponent = () => {
  const { documentId, setDocumentId, category, setCategory } = useDocument();

  return (
    <div>
      <div data-testid="documentId">{documentId}</div>
      <div data-testid="category">{category}</div>
      <button onClick={() => setDocumentId('123')}>Set Document ID</button>
      <button onClick={() => setCategory('finance')}>Set Category</button>
    </div>
  );
};

describe('DocumentProvider and useDocument', () => {
  it('provides and updates context values', () => {
    render(
      <DocumentProvider>
        <MockConsumerComponent />
      </DocumentProvider>
    );

    // Initial values should be empty
    expect(screen.getByTestId('documentId')).toHaveTextContent('');
    expect(screen.getByTestId('category')).toHaveTextContent('');

    // Simulate actions
    fireEvent.click(screen.getByText('Set Document ID'));
    fireEvent.click(screen.getByText('Set Category'));

    // Check if the context values are updated
    expect(screen.getByTestId('documentId')).toHaveTextContent('123');
    expect(screen.getByTestId('category')).toHaveTextContent('finance');
  });
});
