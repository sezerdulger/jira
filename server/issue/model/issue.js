var baseSchema = require('../../baseSchema.js');
const mongoose = require('mongoose');
var options = {discriminatorKey: 'kind'};


module.export = baseSchema.discriminator('Issue', new mongoose.Schema({
	issueId: String,
	title: String,
	type: String,
	team: String,
	project: String,
	createdDate: Date
	//address: {type: Object, default:{}},
	//onlineIntervalSeconds: Number,
}, options));
