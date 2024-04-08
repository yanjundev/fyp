export const filterNotEmpty = (array: any[]) => {
  return array.flatMap((v) => (v ? [v] : []));
};

export const filterUnique = (array: any[]) => {
  return array.filter((v, i) => array.indexOf(v) === i);
};
