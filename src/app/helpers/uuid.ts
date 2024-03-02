export const Uuid = () => {
  //Convert a number from 1, then add 1 so that it doesnt begin with 0
  // and to to base 36. Use substring to remove the first two chars i.e. '.0'.
  return (Math.random() + 1).toString(36).substring(2);
};
