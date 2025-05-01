import qs from "query-string";

interface formQueryType {
  params: string;
  key: string;
  value: string;
}

interface removeQueryType {
  params: string;
  keysToRemove: string[];
}

const formUrlQuery = ({ params, key, value }: formQueryType) => {
  const queryString = qs.parse(params);

  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

const removeUrlQuery = ({ params, keysToRemove }: removeQueryType) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};

export { formUrlQuery, removeUrlQuery };
