module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    AddVoteLog: function (req, res){
        VoteLog.AddVoteLog(req, res.callback);

    }
};
module.exports = _.assign(module.exports, controller);
