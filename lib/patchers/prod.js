function ensure() {
    return this;
}
function params() {
    return this.apply(null, arguments);
}
var noopMaker = function (val) {
    return val ? function () { return val; } : function () { };
};
module.exports = {
    ensure: ensure,
    params: params,
    create: noopMaker({}),
    register: noopMaker(),
    get: noopMaker({})
};
//# sourceMappingURL=prod.js.map