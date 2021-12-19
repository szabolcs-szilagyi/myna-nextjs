import fetch from 'isomorphic-unfetch';

type TOptions = {
  json?: boolean,
}

type TSettings = {
  query?: object,
  options?: TOptions,
  fetchOptions?: RequestInit,
}

export function request(
  url: string,
  { query = {}, options = {}, fetchOptions = {} }: TSettings,
): Promise<Response | any> {
  const queryString = Object.entries(query)
    .reduce((qs, [key, value]) => {
      if (value === undefined) value = '';
      if (!value.toString) throw new Error('.toString is needed for QS value');

      qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`);

      return qs;
    }, [])
    .join('&');

  const uri = queryString ? `${url}?${queryString}` : url;

  let fetchPromise: Promise<unknown>;

  if (options.json) {
    fetchPromise = fetch(uri, { credentials: 'same-origin', ...fetchOptions })
      .then(x => x.json());
  } else {
    fetchPromise = fetch(uri, { credentials: 'same-origin', ...fetchOptions });
  }

  return fetchPromise;
}

export function requestFactory(url: string): (settings: TSettings) => Promise<any> {
  return (settings) => request(url, settings);
}
