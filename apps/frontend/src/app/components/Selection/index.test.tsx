import 'jest-styled-components';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Selection, Props } from './index';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/themes/default';

describe('Selection component', () => {
  const mockOnClick = jest.fn();

  const renderSelection = ({ active, text, onClick }: Props) => {
    render(<Selection active={active} text={text} onClick={onClick} />, {
      wrapper: ({ children }) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the text correctly', () => {
    renderSelection({ text: 'Option A', active: true, onClick: mockOnClick });
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('renders the down arrow icon when not active', () => {
    renderSelection({
      text: 'Option A',
      onClick: mockOnClick,
    } as unknown as Props);
    expect(screen.getByTestId('arrow-down')).toBeInTheDocument();
  });

  it('renders the up arrow icon when active', () => {
    renderSelection({ text: 'Option A', active: true, onClick: mockOnClick });
    expect(screen.getByTestId('arrow-up')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    renderSelection({ text: 'Option A', active: true, onClick: mockOnClick });
    fireEvent.click(screen.getByText('Option A'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
