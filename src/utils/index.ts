export const buildQueryString = (params: any, prefix = '') => {
  const queryParts: string[] = [];

  Object.keys(params).forEach((key) => {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    const value = params[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      queryParts.push(buildQueryString(value, fullKey));
    } else {
      const encodedKey = fullKey;
      const encodedValue = value;
      if (Array.isArray(encodedValue)) {
        encodedValue.map((item) => queryParts.push(`${encodedKey}=${item}`));
      } else {
        queryParts.push(`${encodedKey}=${encodedValue}`);
      }
    }
  });
  return queryParts.join('&');
};
