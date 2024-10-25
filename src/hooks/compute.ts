function compute<T>(callback: () => T): T {
  return callback();
}

export default compute;
