document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResults = document.getElementById('search-results');
  
  // Carregar dados do site
  let siteData = [];
  
  fetch('/InvestSmart/search-data.json')
    .then(response => response.json())
    .then(data => {
      siteData = data;
    })
    .catch(error => console.error('Erro ao carregar dados de pesquisa:', error));
  
  // Função de pesquisa
  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResults.innerHTML = '<p>Digite pelo menos 2 caracteres para pesquisar.</p>';
      return;
    }
    
    const results = siteData.filter(item => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        (item.categories && item.categories.some(cat => cat.toLowerCase().includes(query)))
      );
    });
    
    displayResults(results, query);
  }
  
  // Exibir resultados
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `<p>Nenhum resultado encontrado para "${query}".</p>`;
      return;
    }
    
    let html = `<p>Encontrados ${results.length} resultados para "${query}":</p><ul class="results-list">`;
    
    results.forEach(item => {
      // Destacar a consulta no conteúdo
      let snippet = item.content;
      const index = snippet.toLowerCase().indexOf(query);
      if (index !== -1) {
        const start = Math.max(0, index - 50);
        const end = Math.min(snippet.length, index + query.length + 50);
        snippet = '...' + snippet.substring(start, end) + '...';
      } else {
        snippet = snippet.substring(0, 150) + '...';
      }
      
      // Substituir a consulta por uma versão destacada
      const highlightedSnippet = snippet.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
      
      html += `
        <li class="result-item">
          <h3><a href="${item.url}">${item.title}</a></h3>
          <p class="result-snippet">${highlightedSnippet}</p>
          <p class="result-meta">
            ${item.date ? `<span class="result-date">Publicado em: ${item.date}</span>` : ''}
            ${item.categories ? `<span class="result-categories">Categorias: ${item.categories.join(', ')}</span>` : ''}
          </p>
        </li>
      `;
    });
    
    html += '</ul>';
    searchResults.innerHTML = html;
  }
  
  // Event listeners
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
});