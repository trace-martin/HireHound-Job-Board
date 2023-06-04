document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const profileBtn = document.getElementById('profileBtn');
    const jobsBtn = document.getElementById('jobsBtn');
    const contentContainer = document.getElementById('contentContainer');

    searchBtn.addEventListener('click', () => {
        // request to retireve search results
        contentContainer.innerHTML = '<h2>Search Results</h2>';
    });

    profileBtn.addEventListener('click', ()=> {
        // request for jobs data

        contentContainer.innerHTML = '<h2>User Profile</h2>'
    });

    const handleSaveJob = (jobId) => {
        const jobCard = document.querySelector(`.card.[data-job-id="${jobId}]"`);

        if (jobCar) {
            const saveButton = jobCard.querySelector('.saveJobButton');
            saveButton.disabled = true;
            saveButton.textContent = 'Saved';

            const message = document.createEl('p');
            message.textContent = 'Job saved!';
            jobCard.appendChild(message);
        };

        contentContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('saveJobButton')) {
                const jobId = e.target.dataset.jobId;

                fetch(`/api/save/${jobId}`, {
                    method: 'POST',
                })
                .then((res) => {
                    if (res.ok) {
                        handleSaveJob(jobId);
                    } else {
                        console.error('Error saving job:', res.statusText);
                        alert('Failed to save job. Please try again later');
                    };
                });
            };
        });
    };
});

