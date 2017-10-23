var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        excel: {
            name: "Name"
        }},
        description: {
            type: String
        },

    logo:{
        type: String
    },
    company:[{
        companyObj: {
        type:Schema.Types.ObjectId,
        ref:'Company'
    },
        voteCount:{
         type:Number,
         default: 0     
        }  
}]  
    
});

schema.plugin(deepPopulate, {
    populate: {
        'company.companyObj': {
            select: 'name _id'
        }
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Category', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'company.companyObj','company.companyObj'));
var model = {};
module.exports = _.assign(module.exports, exports, model);