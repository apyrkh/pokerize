export var cn = (...classeNames: (boolean | string | null | undefined)[]) => {
  return classeNames.filter((it) => !!it).join(' ');
};
