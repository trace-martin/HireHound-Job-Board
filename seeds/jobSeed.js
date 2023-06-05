const { Job, User } = require("../models");
const sequelize = require("../config/connection");
const userData = [
  {
    name: "Courtney",
    email: "courtney@email.com",
    password: "password123",
  },
  {
    name: "Trace",
    email: "trace@email.com",
    password: "password123",
  },
  {
    name: "Sergio",
    email: "sergio@email.com",
    password: "password123",
  },
];
const jobData = [
  {
    role_name: "Associate/VP, Partnership",
    description:
      "Orderly Network is looking to hire an Associate/VP, Partnership to join their team.This is a full-time positionthat is 100% remote with no geographical restrictions. Work remotely from anywhere.",
    company_name: "Orderly Network",
    website:
      "https://findwork.dev/QP1eK7M/associatevp-partnership-at-orderly-network",
    date_posted: new Date(),
    user_id: 1,
  },
  {
    role_name: "Graduate Intern - Venture Capital (6-Months Temp-to-Perm)",
    description:
      "Matrixport is looking to hire a Graduate Intern - Venture Capital (6-Months Temp-to-Perm) to join their team.This is a full-time positionthat is based in Singapore.",
    company_name: "Matrixport",
    website:
      "https://findwork.dev/MNNJZyM/graduate-intern-venture-capital-6-months-temp-to-perm-at-matrixport",
    date_posted: new Date(),
    user_id: 2,
  },
  {
    role_name: "Financial Risk Analyst",
    description:
      "Xapo is looking to hire a Financial Risk Analyst to join their team.This is a full-time positionthat is 100% remote with no geographical restrictions. Work remotely from anywhere.",
    company_name: "Xapo",
    website: "https://findwork.dev/XlLqemX/financial-risk-analyst-at-xapo",
    date_posted: new Date(),
    user_id: 3,
  },
  {
    role_name: "Technical Account Manager, Europe",
    description: "description was too long",
    company_name: "Company",
    website:
      "https://findwork.dev/Mb9By6Q/technical-account-manager-europe-at-evergiving",
    date_posted: new Date(),
    user_id: 1,
  },
];
// added async
const seedJobs = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
      individualHooks: true,
    });
    await Job.bulkCreate(jobData);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedJobs();
