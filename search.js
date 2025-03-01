document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    
    if (isValidUrl(searchTerm)) {
        addUrlToSites(searchTerm).then(() => {
            window.location.href = searchTerm;
        });
    } else {
        fetch('sites.txt')
            .then(response => response.text())
            .then(data => {
                const sites = data.split('\n');
                const results = sites.filter(site => site.includes(searchTerm));
                displayResults(results);
            });
    }
});

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;  
    }
}

async function addUrlToSites(url) {
    const response = await fetch('/add-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });
    return response.ok;
}

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
