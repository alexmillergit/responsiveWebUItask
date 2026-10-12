import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './TextField.module.css';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** Accessible name. Visually hidden: the design relies on the placeholder. */
  label: string;
  /** Error message; marks the field invalid and is announced to assistive tech. */
  error?: string;
};

export function TextField({ label, error, id, className, ...inputProps }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className="visually-hidden" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error ? (
        <span id={errorId} className="visually-hidden">
          {error}
        </span>
      ) : null}
    </div>
  );
}
