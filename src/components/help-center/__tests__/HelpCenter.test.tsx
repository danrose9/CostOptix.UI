import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelpCenter from '../HelpCenter';
import { DocumentContext, IDocumentContextProps } from '../DocumentContext';

describe('HelpCenter', () => {
  const renderWithDocumentContext = (ui: React.ReactElement, providerProps: IDocumentContextProps) => {
    return render(<DocumentContext.Provider value={providerProps}>{ui}</DocumentContext.Provider>);
  };

  beforeEach(() => {
    render(<HelpCenter />);
  });

  it('shows Help Center on initial render', () => {
    // Looking for a heading with specific text content
    expect(screen.getByRole('heading', { name: 'Help Center' })).toBeInTheDocument();
  });

  it('shows the Get Started document on initial render', () => {
    // Looking for a heading with specific text content

    expect(screen.getByRole('heading', { name: 'Get Started' })).toBeInTheDocument();
  });

  //   it('hides the Get Started document when a documentId is set', () => {
  //     const providerProps: IDocumentContextProps = {
  //       documentId: '65c8cdbe67367cae14bbabb9', //Privacy Policy
  //       setDocumentId: jest.fn(),
  //       category: 'Legal',
  //       setCategory: jest.fn(),
  //     };

  //     renderWithDocumentContext(<HelpCenter />, providerProps);

  //     expect(screen.getByRole('heading', { name: 'Get Started' })).not.toBeInTheDocument();
  //   });
});
