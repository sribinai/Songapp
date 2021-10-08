export function createRandomPassCode() {
  let newPassCode =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return newPassCode;
}
