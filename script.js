 const apiBaseUrl = "https://dummyjson.com"
 const searchInput = document.getElementById('search');
 const quoteList = document.getElementById('quoteList');
 const errorMessage = document.getElementById('errorMessage');
 let quotesData = [];

  searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const filteredQuotes = quotesData.filter(q =>
        q.quote.toLowerCase().includes(filter)
      );
      displayQuotes(filteredQuotes);
    });
 async function fetchingData() {
    try {
      const response = await fetch(`${apiBaseUrl}/quotes`)
      if (!response.ok) {
         if (response.status === 404) {
            throw new Error("404")
         }
      }  
      const data = await response.json();
      quotesData = data.quotes;
      console.log(quotesData)
      displayQuotes(quotesData)
    } catch (error) {
        if(error.message === "404") {
            errorMessage.textContent = "Resources is Not Found!"
        }
    }
    
}
// Display quotes in <ul>
function displayQuotes(quotes) {
      quoteList.innerHTML = '';
      quotes.forEach(q => {
        const li = document.createElement('li');
        li.textContent = `"${q.quote}" — ${q.author}`;
        quoteList.appendChild(li);
      });
    }
fetchingData()