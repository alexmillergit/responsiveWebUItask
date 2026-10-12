export const GRAPHQL_ENDPOINT: string =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ?? 'https://graphqlzero.almansi.me/api';

type GraphQLError = { message: string };

type GraphQLResponse<TData> = {
  data?: TData | null;
  errors?: GraphQLError[];
};

export class GraphQLRequestError extends Error {
  constructor(
    message: string,
    readonly details?: GraphQLError[],
  ) {
    super(message);
    this.name = 'GraphQLRequestError';
  }
}

type RequestOptions = {
  signal?: AbortSignal;
  endpoint?: string;
};

/** Minimal GraphQL-over-HTTP client (POST + JSON); enough for a single mutation without a library. */
export async function graphqlRequest<TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables: TVariables,
  { signal, endpoint = GRAPHQL_ENDPOINT }: RequestOptions = {},
): Promise<TData> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal,
  });

  if (!response.ok) {
    throw new GraphQLRequestError(`Request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new GraphQLRequestError(payload.errors[0].message, payload.errors);
  }
  if (payload.data == null) {
    throw new GraphQLRequestError('The server returned no data');
  }

  return payload.data;
}
