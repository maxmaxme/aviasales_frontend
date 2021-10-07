export const addValue = <T>(value: T, array: T[]): T[] => {
  if (!array.includes(value)) {
    return [...array, value];
  }
  return array;
};

export const removeValue = <T>(value: T, array: T[]): T[] => {
  return array.filter(function(item) {
    return item !== value;
  });
};
