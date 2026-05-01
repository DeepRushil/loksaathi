'use client';

/**
 * @file components/ui/Button.tsx
 * @description Accessible, reusable Button component with multiple variants.
 * Supports keyboard focus, loading state, ARIA attributes, and icons.
 */

import React from 'react';
import type { ButtonProps } from '@/types';
import styles from './Button.module.css';

/**
 * Button component with variant styling, loading state, and full accessibility.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            <span className="sr-only">Loading...</span>
            <span aria-hidden="true">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className={styles.icon} aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className={styles.icon} aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
