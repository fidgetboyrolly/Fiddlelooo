document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    fetch('sites.txt')
        .then(response => response.text())
        .then(data => {
            const sites = data.split('\n');
            const results = sites.filter(site => site.includes(searchTerm));
            displayResults(results);
        });
});

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (results.length === 0) {
        resultsDiv.innerHTML = 'No results found.';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.textContent = result;
            resultsDiv.appendChild(resultItem);
        });
    }
}
