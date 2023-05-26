const Job = require("./job");
const User = require("./User");

//Adds the foreign key to job for one user
Job.belongsTo(User);

// The user can have many jobs
User.hasMany(Job);

module.exports = { Job, User };
