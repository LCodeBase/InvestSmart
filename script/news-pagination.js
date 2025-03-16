document.addEventListener('DOMContentLoaded', function () {
  let currentNewsPage = 1
  let currentEduPage = 1
  const postsPerPage = 6

  const loadMoreNewsBtn = document.getElementById('loadMoreNews')
  const loadMoreEduBtn = document.getElementById('loadMoreEdu')
  const newsTab = document.getElementById('noticias-tab')
  const eduTab = document.getElementById('educacao-tab')

  // Tab switching functionality
  const tabs = document.querySelectorAll('.tab-btn')
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'))
      tab.classList.add('active')

      const tabId = tab.getAttribute('data-tab')
      if (tabId === 'noticias') {
        newsTab.style.display = 'block'
        eduTab.style.display = 'none'
      } else {
        newsTab.style.display = 'none'
        eduTab.style.display = 'block'
      }
    })
  })

  // Load more news posts
  if (loadMoreNewsBtn) {
    loadMoreNewsBtn.addEventListener('click', function () {
      currentNewsPage++
      const start = currentNewsPage * postsPerPage
      const newsItems = document.querySelectorAll('#noticias-tab .news-item')

      // Show next set of posts
      for (
        let i = start;
        i < start + postsPerPage && i < newsItems.length;
        i++
      ) {
        if (newsItems[i]) {
          newsItems[i].style.display = 'block'
        }
      }

      // Hide button if no more posts
      if (start + postsPerPage >= newsItems.length) {
        loadMoreNewsBtn.style.display = 'none'
      }
    })
  }

  // Load more educational posts
  if (loadMoreEduBtn) {
    loadMoreEduBtn.addEventListener('click', function () {
      currentEduPage++
      const start = currentEduPage * postsPerPage
      const eduItems = document.querySelectorAll('#educacao-tab .news-item')

      // Show next set of posts
      for (
        let i = start;
        i < start + postsPerPage && i < eduItems.length;
        i++
      ) {
        if (eduItems[i]) {
          eduItems[i].style.display = 'block'
        }
      }

      // Hide button if no more posts
      if (start + postsPerPage >= eduItems.length) {
        loadMoreEduBtn.style.display = 'none'
      }
    })
  }

  // Initialize post visibility
  function initializePostVisibility() {
    const newsItems = document.querySelectorAll('#noticias-tab .news-item')
    const eduItems = document.querySelectorAll('#educacao-tab .news-item')

    // Hide posts beyond initial page
    newsItems.forEach((item, index) => {
      item.style.display = index < postsPerPage ? 'block' : 'none'
    })

    eduItems.forEach((item, index) => {
      item.style.display = index < postsPerPage ? 'block' : 'none'
    })

    // Show/hide load more buttons based on content
    if (loadMoreNewsBtn) {
      loadMoreNewsBtn.style.display =
        newsItems.length > postsPerPage ? 'block' : 'none'
    }
    if (loadMoreEduBtn) {
      loadMoreEduBtn.style.display =
        eduItems.length > postsPerPage ? 'block' : 'none'
    }
  }

  initializePostVisibility()
})
