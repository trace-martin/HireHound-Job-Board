// Search Results code

const jobCards = document.querySelectorAll('.card[data-job-data]');

jobCards.forEach((card) => {
    card.addEventListener('click', (event) => {
        event.preventDefault();

        const jobData = JSON.parse(event.currentTarget.getAttribute('data-job-data'));
        
        document.getElementById('single-job-card').classList.remove('visually-hidden');

        const jobTitleDiv = document.getElementById('job-title');
        const jobDescriptionDiv = document.getElementById('job-description');
        
        jobTitleDiv.textContent = jobData.role;
        jobDescriptionDiv.innerHTML = jobData.text;
    })
});

document.addEventListener('DOMContentLoaded', () => {
    const saveJobButtons = document.querySelectorAll('.saveJobButton');
  
    saveJobButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const jobId = e.target.dataset.jobId;
        fetch(`/api/save/${jobId}`, {
          method: 'POST',
        })
          .then((res) => {
            if (res.ok) {
              alert('Job saved!');
            } else {
              console.error('Error saving job:', res.statusText);
              alert('Failed to save job. Please try again.');
            }
          })
          .catch((error) => {
            console.error('Error saving job:', error);
            alert('Failed to save job. Please try again later');
          });
      });
    });
  });