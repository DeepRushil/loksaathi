import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('primary');
    expect(button).toHaveClass('md');
  });

  it('renders with loading state', () => {
    render(<Button isLoading>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with left and right icons', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">L</span>} rightIcon={<span data-testid="right-icon">R</span>}>
        Click me
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
