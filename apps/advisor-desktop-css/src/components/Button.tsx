import * as React from 'react';

export interface ButtonProps {
  rootClass?: string;
  color?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined';
  children?: React.ReactNode;
}

export const Button = ({
  rootClass,
  color = 'default',
  disabled = false,
  size = 'medium',
  variant = 'contained',
  children,
}: ButtonProps) => {
  const classes = [];

  if (rootClass) {
    classes.push(rootClass);
  }

  classes.push('button');

  switch (variant) {
    case 'contained':
      classes.push('button--contained');
      if (disabled) {
        classes.push('button--disabled');
        classes.push('button--disabled-contained');
      } else {
        switch (color) {
          case 'default': {
            classes.push('button--contained-default');
            break;
          }
          case 'primary': {
            classes.push('button--contained-primary');
            break;
          }
          case 'secondary': {
            classes.push('button--contained-secondary');
            break;
          }
        }
      }
      break;
    case 'outlined':
      classes.push('button--outlined');
      if (disabled) {
        classes.push('button--disabled');
        classes.push('button--disabled-outlined');
      } else {
        switch (color) {
          case 'default': {
            classes.push('button--outlined-default');
            break;
          }
          case 'primary': {
            classes.push('button--outlined-primary');
            break;
          }
          case 'secondary': {
            classes.push('button--outlined-secondary');
            break;
          }
        }
      }
      break;
  }

  switch (size) {
    case 'small': {
      classes.push('button--small');
      break;
    }
    case 'medium': {
      classes.push('button--medium');
      break;
    }
    case 'large': {
      classes.push('button--large');
      break;
    }
  }

  return <button className={classes.join(' ')}>{children}</button>;
};
