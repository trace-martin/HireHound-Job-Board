const { Job, User } = require('../models');

const retrieveSavedJobDetails = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Job,
            },
        });
        
        if(!user) {
            throw new Error('User not found');
        }
    
        const savedJobs = user.Jobs.map(job => ({
            id: job.id,
            role_name: job.role.name,
            description: job.description,
            company_name: job.company_name,
        }));
        return savedJobs;
    } catch (error) {
        alert('We are having difficulty retrieving your saved job details. Please try again later!')
        console.error('Error retrieving saved job details:', error);
        throw error;
    }
};

module.exports = {
    retrieveSavedJobDetails,
};