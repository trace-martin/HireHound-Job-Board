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
})