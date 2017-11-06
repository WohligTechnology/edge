var schema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    userAgentDetails: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

schema.plugin(deepPopulate, {
            populate: {
                'userId': {
                    select: 'name _id email'

                },
                'category': {
                    select: 'name _id'
                },
                'company': {
                    select: 'name _id'
                }
            }
            }); 
            
schema.plugin(uniqueValidator); schema.plugin(timestamps);
 module.exports = mongoose.model('VoteLog', schema);

        var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'userId category company', 'userId category company'));
        var model = {
            AddVoteLog: function (data, callback) {
                var Model = this;
                var voteData = data.body;
                voteData.userAgentDetails = JSON.stringify(data.headers);
                console.log(data.headers);
                Model.saveData(voteData, function (err, data2) {
                    if (err) {
                        callback(err, data2);
                    } else {

                        Category.findOne({
                            "_id": data.body.category
                        }).exec(function (err, categoryData) {
                            //console.log(data);
                            _.each(categoryData.company, function (value) {
                                if (value.companyObj == data.body.company) {
                                    value.voteCount = ++value.voteCount;
                                }
                                //console.log(value);
                            });

                            console.log(categoryData);
                            //   data.company.voteCount = ++data.company.voteCount;
                            categoryData.save(function (err, data) {
                                callback(err, data);
                            });

                        });

                    }
                });

            }

        }; module.exports = _.assign(module.exports, exports, model);