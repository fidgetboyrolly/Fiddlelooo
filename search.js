document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (isValidUrl(searchTerm)) {
        addUrlToSites(searchTerm).then(() => {
            openInPWA(searchTerm);
        });
    } else {
        fetch('sites.txt')
            .then(response => response.text())
            .then(data => {
                const sites = data.split('\n');
                const results = sites.filter(site => site.toLowerCase().includes(searchTerm));
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
            const link = document.createElement('a');
            link.href = result;
            link.textContent = getTitleFromUrl(result);
            link.target = '_blank';
            link.addEventListener('click', function(event) {
                event.preventDefault();
                openInPWA(result);
            });
            resultItem.appendChild(link);
            resultsDiv.appendChild(resultItem);
        });
    }
}

function getTitleFromUrl(url) {
    // Extract the title from the URL (you can customize this function)
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function openInPWA(url) {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        // PWA mode
        window.location.assign(url);
    } else {
        // Fallback to normal browser behavior
        window.open(url, '_blank');
    }
}
