var schema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref : 'Company'
        
    },
    category: {
        type: Schema.Types.ObjectId,
        ref : 'Category'
    },
    userAgentDetails:{
        type : String
    }   
    
});

schema.plugin(deepPopulate, {

});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('VoteLog', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    AddVoteLog : function (data, callback) {
       var Model  = this;
       var voteData = data.body;
       voteData.userAgentDetails =  JSON.stringify(data.headers);   
        console.log(data.headers);
        Model.saveData(voteData, function (err, data2) {
            if (err) {
                callback(err, data2);
            } else {
              
                Category.findOne({
                    "_id": data.body.category
                }).exec(function (err, categoryData) {
                    //console.log(data);
                    _.each(categoryData.company, function(value) {
                        if(value.companyObj == data.body.company){
                            value.voteCount = ++value.voteCount;
                        }
                        //console.log(value);
                      });
                      console.log(categoryData);
                 //   data.company.voteCount = ++data.company.voteCount;
                 categoryData.save(function () {});
                 callback(null, "Vote Done Successfully");
                });
              
            }
        });
        
    }

};
module.exports = _.assign(module.exports, exports, model);