export const getEmbeddedResourceName = (inputString: string) => {
  const segments = inputString.split('/');
  return segments.pop();
};
