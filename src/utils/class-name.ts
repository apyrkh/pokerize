export var cn = (...classeNames: (boolean | string | undefined)[]) => {
  return classeNames.filter((it) => !!it).join(' ');
}
