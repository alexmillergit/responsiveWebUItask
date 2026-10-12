import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styles from './Typography.module.css';

export type TypographyVariant = 'display' | 'lead' | 'body' | 'bodyMedium' | 'small' | 'caption';
export type TypographyTone = 'default' | 'muted' | 'subtle' | 'accent' | 'inverse';

const DEFAULT_ELEMENT: Record<TypographyVariant, ElementType> = {
  display: 'h1',
  lead: 'p',
  body: 'p',
  bodyMedium: 'p',
  small: 'p',
  caption: 'span',
};

type TypographyOwnProps<T extends ElementType> = {
  /** Visual style from the type scale. Also picks a sensible default element. */
  variant?: TypographyVariant;
  /** Colour role. */
  tone?: TypographyTone;
  /** Render a different element without changing the look. */
  as?: T;
  className?: string;
  children?: ReactNode;
};

export type TypographyProps<T extends ElementType = 'p'> = TypographyOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyOwnProps<T>>;

/** Base text primitive: every piece of copy on the page goes through the type scale. */
export function Typography<T extends ElementType = 'p'>({
  variant = 'body',
  tone = 'default',
  as,
  className,
  children,
  ...rest
}: TypographyProps<T>) {
  const Component: ElementType = as ?? DEFAULT_ELEMENT[variant];
  const classes = [styles.root, styles[variant], styles[tone], className].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
