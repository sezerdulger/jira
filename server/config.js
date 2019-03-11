'use strict';

const env = process.env.NODE_ENV;
console.log("env =>" + env);
if (!env) {
	console.error("Please set NODE_ENV");
}
const dev = {
 app: {
   port: 8080
 },
 db: {
   host: '192.168.34.10',
   port: 27017,
   name: 'jira'
 }
};

const config = {
 dev
};

module.exports = config[env];