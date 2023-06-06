//Search code

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchText = document.getElementById('search-box').value.trim();

    document.location.assign(`/searchResults?q=${searchText}`);
});