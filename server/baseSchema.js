const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');	

var options = {discriminatorKey: 'kind'};
var baseSchema = new mongoose.Schema(
	{
		createdDate: { type: Date, default: Date.now },
		lastUpdatedDate: { type: Date, default: Date.now },
		createdBy: String,
		lastUpdatedBy: String,
		owner: String
	}, options);
baseSchema.plugin(mongoosePaginate);

	
var baseModel=mongoose.model('BaseSchema', baseSchema);

baseModel.paginate({}, {limit: 10});

module.exports=baseModel;