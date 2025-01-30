const searchForm = document.getElementById('search-form'); 
const searchInput = document.getElementById('search-anytingz');
const resultsEl = document.getElementById('results');

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();  
    const q = searchInput.value.trim();  
    if (q) {  
        search(q);
    }
});

function search(q) {
    const apikey = 'hhRdMerbcwXl9Oyg1lrJUoLIyGfYjZsU';
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}`;

    
    resultsEl.innerHTML = '<p>Loading...</p>';

    fetch(path)
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            let resultsHTML = '';

            json.data.forEach(function (obj) {
                const url = obj.images.fixed_width.url;
                const width = obj.images.fixed_width.width;
                const height = obj.images.fixed_width.height;
                const title = obj.title;

                resultsHTML += `<img src="${url}" width="${width}" height="${height}" alt="${title}">`;
            });

            // Display the results 
            resultsEl.innerHTML = resultsHTML;
        })
        .catch(function (err) {
            resultsEl.innerHTML = '<p>Error loading images. Try again later.</p>';
            console.log(err.message);
        });
}
