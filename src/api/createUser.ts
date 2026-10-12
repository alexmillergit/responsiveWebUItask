import { graphqlRequest } from './graphqlClient';

export const CREATE_USER_MUTATION = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export type CreateUserInput = {
  name: string;
  username: string;
  email: string;
};

export type CreatedUser = {
  id: string;
  name: string;
  email: string;
};

type CreateUserData = { createUser: CreatedUser };

/** Builds the mutation input for a trial sign-up from just an email address. */
export function buildCreateUserInput(email: string): CreateUserInput {
  const normalized = email.trim();
  // The dummy API requires a name and username; derive both from the local part of the address.
  const handle = normalized.split('@')[0] || normalized;
  return { name: handle, username: handle, email: normalized };
}

export async function createUser(
  email: string,
  options: { signal?: AbortSignal; endpoint?: string } = {},
): Promise<CreatedUser> {
  const data = await graphqlRequest<CreateUserData, { input: CreateUserInput }>(
    CREATE_USER_MUTATION,
    { input: buildCreateUserInput(email) },
    options,
  );
  return data.createUser;
}
