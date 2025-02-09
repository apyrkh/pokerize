export var cn = (...classeNames: (string | boolean)[]) => {
  return classeNames.filter((it) => !!it).join(' ');
}
