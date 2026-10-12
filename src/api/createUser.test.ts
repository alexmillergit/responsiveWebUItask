import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildCreateUserInput, createUser } from './createUser';
import { GraphQLRequestError } from './graphqlClient';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

afterEach(() => vi.unstubAllGlobals());

describe('buildCreateUserInput', () => {
  it('derives name and username from the local part of the email', () => {
    expect(buildCreateUserInput(' jane@example.com ')).toEqual({
      name: 'jane',
      username: 'jane',
      email: 'jane@example.com',
    });
  });
});

describe('createUser', () => {
  it('posts the createUser mutation and returns the created user', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      json({ data: { createUser: { id: '11', name: 'jane', email: 'jane@example.com' } } }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const user = await createUser('jane@example.com', { endpoint: 'https://example.test/api' });

    expect(user).toEqual({ id: '11', name: 'jane', email: 'jane@example.com' });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://example.test/api');
    const body = JSON.parse(init.body as string);
    expect(body.query).toContain('createUser(input: $input)');
    expect(body.variables.input.email).toBe('jane@example.com');
  });

  it('surfaces GraphQL errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({ errors: [{ message: 'Nope' }] })));
    await expect(createUser('a@b.co')).rejects.toThrow('Nope');
  });

  it('surfaces HTTP failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({}, 500)));
    await expect(createUser('a@b.co')).rejects.toBeInstanceOf(GraphQLRequestError);
  });
});
