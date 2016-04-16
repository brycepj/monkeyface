function ensure() {
  return this;
}

function params() {
  return this.apply(null, arguments);
}

var noopMaker = (val?: any) => {
  return val ? () => val : () => {};
};

export = {
  ensure: ensure,
  params: params,
  create: noopMaker({}),
  register: noopMaker(),
  get: noopMaker({})
};