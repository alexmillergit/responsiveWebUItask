import { useCallback, useEffect, useRef, useState } from 'react';
import { createUser } from '../api/createUser';
import type { CreatedUser } from '../api/createUser';
import { isValidEmail } from '../utils/email';

export type TrialState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; user: CreatedUser }
  | { status: 'error'; message: string };

const INVALID_EMAIL_MESSAGE = 'Please enter a valid email address.';
const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.';

/** Owns the "Start free trial" flow: validate the email, run the createUser mutation, expose state. */
export function useStartFreeTrial() {
  const [state, setState] = useState<TrialState>({ status: 'idle' });
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const start = useCallback(async (email: string) => {
    if (!isValidEmail(email)) {
      setState({ status: 'error', message: INVALID_EMAIL_MESSAGE });
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState({ status: 'loading' });
    try {
      const user = await createUser(email, { signal: controller.signal });
      if (!controller.signal.aborted) setState({ status: 'success', user });
    } catch (error) {
      if (controller.signal.aborted) return;
      const message = error instanceof Error && error.message ? error.message : GENERIC_ERROR_MESSAGE;
      setState({ status: 'error', message });
    }
  }, []);

  const reset = useCallback(() => setState({ status: 'idle' }), []);

  return { state, start, reset };
}
