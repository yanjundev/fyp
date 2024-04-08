const isTag = (text: string) => {
  const TAG_REGEX = /^[a-zA-Z0-9]+$/;

  return TAG_REGEX.test(text);
};

export { isTag };
