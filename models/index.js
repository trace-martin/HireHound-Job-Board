const Job = require("./job");
const User = require("./User");

//Adds the foreign key to job for one user
//added the foreign ID
Job.belongsTo(User, {
  foreignKey: "user_id",
});

// The user can have many jobs
User.hasMany(Job, {
  foreignKey: "user_id",
});

module.exports = { Job, User };
