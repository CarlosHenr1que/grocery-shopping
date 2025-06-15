import 'jest-styled-components';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Input } from '.';
import { ThemeProvider } from 'styled-components';

import theme from '../../styles/themes/default';

describe('Input (component)', () => {
  it('should render with correct props and style', () => {
    const placeHolder = 'placeholder';
    render(<Input placeholder={placeHolder} />, {
      wrapper: ({ children }) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ),
    });

    const inputContainer = screen.getByTestId('input-container');
    const inputField = screen.getByPlaceholderText(placeHolder);
    const iconElement = screen.getByTestId('input-search-icon');

    expect(inputContainer).toHaveStyleRule('background', theme.colors.surface);
    expect(inputField).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });
});
