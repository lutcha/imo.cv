'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils/helpers';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
      primary:
        'bg-primary-blue-600 text-white hover:bg-primary-blue-700 focus:ring-primary-blue-500 dark:bg-primary-blue-500 dark:hover:bg-primary-blue-600',
      secondary:
        'bg-imo-primary text-white hover:bg-imo-secondary focus:ring-imo-primary',
      outline:
        'border-2 border-primary-blue-600 text-primary-blue-600 hover:bg-primary-blue-50 dark:border-primary-blue-500 dark:text-primary-blue-400 dark:hover:bg-primary-blue-900/30 focus:ring-primary-blue-500',
      ghost:
        'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500',
      danger:
        'bg-danger text-white hover:bg-red-600 focus:ring-danger',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2',
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = 'Button';
