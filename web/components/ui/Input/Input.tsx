'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils/helpers';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, leftAddon, rightAddon, ...props },
    ref
  ) => {
    const input = (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-white px-3 py-2 text-gray-900 shadow-sm transition placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:ring-offset-0',
          'dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500',
          error
            ? 'border-danger focus:ring-danger'
            : 'border-gray-300 dark:border-gray-600',
          (leftAddon || rightAddon) && 'border-0 focus:ring-0',
          className
        )}
        {...props}
      />
    );
    if (leftAddon || rightAddon) {
      return (
        <div
          className={cn(
            'flex overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800',
            error ? 'border-danger' : 'border-gray-300 dark:border-gray-600'
          )}
        >
          {leftAddon && (
            <span className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
              {leftAddon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'min-w-0 flex-1 border-0 bg-transparent px-3 py-2 focus:ring-2 focus:ring-inset focus:ring-primary-blue-500',
              className
            )}
            {...props}
          />
          {rightAddon && (
            <span className="flex items-center border-l border-gray-200 bg-gray-50 px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-700">
              {rightAddon}
            </span>
          )}
        </div>
      );
    }
    return input;
  }
);
Input.displayName = 'Input';
