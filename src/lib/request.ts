export function request(url: string, { query = {}, options = {}, fetchOptions = {} }) {
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

  if ((<any>options)?.json) {
    fetchPromise = fetch(uri, fetchOptions)
      .then(x => x.json());
  } else {
    fetchPromise = fetch(uri, fetchOptions);
  }

  return fetchPromise;
};

export function requestFactory(url) {
  return (options) => request(url, options);
}
