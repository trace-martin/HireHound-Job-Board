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

    jobsBtn.addEventListener('click', () => {
        // call
        contentContainer.innerHTML = '<h2>Saved Jobs</h2>'
    })
});