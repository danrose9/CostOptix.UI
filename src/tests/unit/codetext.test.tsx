import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CodeText from '../../components/CodeText';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

describe('Test CodeText component', () => {
  test('should render correcly', () => {
    const { getByTestId } = render(<CodeText>Hello World!</CodeText>);

    expect(getByTestId('code-text')).toBeTruthy();
    expect(getByTestId('code-text-copy-button')).toBeTruthy();
  });

  test('should render text', () => {
    render(<CodeText>Hello World!</CodeText>);

    const codeTextDisplay = screen.getByText('Hello World!');
    expect(codeTextDisplay).toBeTruthy();
  });

  const originalClipboard = { ...global.navigator.clipboard };

  test('copies all codes to clipboard when clicked', async () => {
    const user = userEvent.setup();
    render(<CodeText>Hello World!</CodeText>);

    const copyButton = screen.getByTestId('code-text-copy-button');
    await user.click(copyButton);

    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe('Hello World!');
  });
});
