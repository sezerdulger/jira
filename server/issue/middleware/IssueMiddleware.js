let Issue = require('../model/issue.js')

let data = require('../data/data.json')
const fs = require('fs');

let sheetKey="Liste";

module.exports =class IssueMiddleware {
	constructor(router) {
		this.router=router;
		this.httpRequests();
	}

	exportData() {
		fs.writeFile("./issue/data/data.json", JSON.stringify(response, null, 4), function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		});
	}

	exportFromList() {
		let response=[];
		let kpis = require('../data/kpis.json')
		kpis[sheetKey].forEach((issue, index) => {
			if (index > 0) {
				response.push({
					type: issue.A,
					id: issue.B,
					title: issue.C,
					team: issue.D,
					project: issue.E,
					createdDate: issue.L
				});
			}
		});
	}
	
	calculateRate() {
		let closedIssuesCount = this.retrieveClosedIssuesCountThatOpenedBefore1March();
		let openedIssueCounts = {};
		let rates = {};
		data.forEach((d) => {
			if (!openedIssueCounts[d.project]) {
				openedIssueCounts[d.project] = 1;
			}
			else {
				openedIssueCounts[d.project] += 1;
			}
		});

		Object.keys(openedIssueCounts).forEach(p => {
			rates[p] = closedIssuesCount[p] / openedIssueCounts[p] * 100
			console.info("project => " + p + " total => " + openedIssueCounts[p] + " closed => " + closedIssuesCount[p])
		});

		return rates;
	}

	retrieveClosedIssuesCountThatOpenedBefore1March() {
		//TODO retrieve closed issues that opened before 1 March
		let closedIssues = [
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "LIFEBOX"},
			{project: "FİZY"},
			{project: "FİZY"}
		];

		let closedIssuesCount = {};

		closedIssues.forEach(c => {
			if (!closedIssuesCount[c.project]) {
				closedIssuesCount[c.project] = 1;
			}
			else {
				closedIssuesCount[c.project] += 1;
			}
		});
		return closedIssuesCount;
	}
		
    
	httpRequests() {
		this.router.get('/issues', (req, res, next) => {
			console.info("get");
			
			res.json(data);
		});
		
		this.router.get('/issues/points', (req, res, next) => {
			console.info("get");
			
			const points = this.calculateRate();
			
			res.json(points);
		});
	}
}

