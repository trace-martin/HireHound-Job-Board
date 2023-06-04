document.addEventListener('DOMContentLoaded', () => {
    const jobCards = document.querySelectorAll('.card[data-job-data]');
    const jobTitleElement = document.getElementById('job-title');
    const jobDescriptionElement = document.getElementById('job-description');
  
    jobCards.forEach((jobCard) => {
      jobCard.addEventListener('click', () => {
        const jobData = JSON.parse(jobCard.dataset.jobData);
        jobTitleElement.textContent = jobData.role;
        jobDescriptionElement.textContent = jobData.description;
      });
    });
});