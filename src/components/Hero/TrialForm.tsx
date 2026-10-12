import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useStartFreeTrial } from '../../hooks/useStartFreeTrial';
import { TRIAL_EMAIL_ID } from '../navigation';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { Typography } from '../ui/Typography';
import styles from './TrialForm.module.css';

/** Email capture for the free trial. Submitting runs the createUser GraphQL mutation. */
export function TrialForm() {
  const [email, setEmail] = useState('');
  const { state, start, reset } = useStartFreeTrial();

  const isLoading = state.status === 'loading';
  const errorMessage = state.status === 'error' ? state.message : undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (state.status !== 'idle' && state.status !== 'loading') reset();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    await start(email);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <TextField
          id={TRIAL_EMAIL_ID}
          className={styles.field}
          label="Email address"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          error={errorMessage}
        />
        <Button type="submit" size="lg" className={styles.submit} loading={isLoading}>
          Start free trial
        </Button>
      </form>

      <Typography variant="small" tone="muted" className={styles.terms}>
        Start your free 14-day trial, no credit card necessary. By providing your email, you agree
        to our{' '}
        <a className={styles.termsLink} href="#terms">
          terms of service
        </a>
        .
      </Typography>

      <p className={styles.feedback} role="status" aria-live="polite">
        {state.status === 'success' ? (
          <span className={styles.success}>
            Thanks! Your free trial has started for {state.user.email}.
          </span>
        ) : null}
        {errorMessage ? <span className={styles.error}>{errorMessage}</span> : null}
      </p>
    </div>
  );
}
