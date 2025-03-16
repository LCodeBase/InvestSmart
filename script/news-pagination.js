document.addEventListener('DOMContentLoaded', function () {
  let currentNewsPage = 1
  let currentEduPage = 1
  const postsPerPage = 5 // Ajustado para 6 posts por página para corresponder ao slice no HTML

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
      // Rotate the icon when clicked
      const icon = this.querySelector('i')
      icon.style.transform = 'rotate(180deg)'

      // Change button text after click
      this.innerHTML = 'Carregando... <i class="fas fa-spinner fa-spin"></i>'

      // Show all remaining posts with staggered fade-in animation
      setTimeout(() => {
        const newsItems = document.querySelectorAll('#noticias-tab .news-item')
        let visibleCount = 0

        newsItems.forEach((item, index) => {
          if (item.style.display !== 'none') {
            visibleCount++
          }
        })

        // Show all remaining posts
        let animationDelay = 0
        for (let i = visibleCount; i < newsItems.length; i++) {
          if (newsItems[i]) {
            newsItems[i].style.opacity = '0'
            newsItems[i].style.display = 'block'
            newsItems[i].style.transform = 'translateY(20px)'

            setTimeout(() => {
              newsItems[i].style.transition =
                'opacity 0.5s ease, transform 0.5s ease'
              newsItems[i].style.opacity = '1'
              newsItems[i].style.transform = 'translateY(0)'
            }, 50 * animationDelay)

            animationDelay++
          }
        }

        // Update button text and hide it after showing all posts
        setTimeout(() => {
          this.innerHTML =
            'Todas as notícias carregadas <i class="fas fa-check"></i>'

          // Hide button after a delay
          setTimeout(() => {
            this.style.display = 'none'
          }, 2000)
        }, 500)
      }, 500)
    })
  }

  // Load more educational posts
  if (loadMoreEduBtn) {
    loadMoreEduBtn.addEventListener('click', function () {
      // Rotate the icon when clicked
      const icon = this.querySelector('i')
      icon.style.transform = 'rotate(180deg)'

      // Change button text after click
      this.innerHTML = 'Carregando... <i class="fas fa-spinner fa-spin"></i>'

      // Show all remaining posts with staggered fade-in animation
      setTimeout(() => {
        const eduItems = document.querySelectorAll('#educacao-tab .news-item')
        let visibleCount = 0

        eduItems.forEach((item, index) => {
          if (item.style.display !== 'none') {
            visibleCount++
          }
        })

        // Show all remaining posts
        let animationDelay = 0
        for (let i = visibleCount; i < eduItems.length; i++) {
          if (eduItems[i]) {
            eduItems[i].style.opacity = '0'
            eduItems[i].style.display = 'block'
            eduItems[i].style.transform = 'translateY(20px)'

            setTimeout(() => {
              eduItems[i].style.transition =
                'opacity 0.5s ease, transform 0.5s ease'
              eduItems[i].style.opacity = '1'
              eduItems[i].style.transform = 'translateY(0)'
            }, 50 * animationDelay)

            animationDelay++
          }
        }

        // Update button text and hide it after showing all posts
        setTimeout(() => {
          this.innerHTML =
            'Todo conteúdo carregado <i class="fas fa-check"></i>'

          // Hide button after a delay
          setTimeout(() => {
            this.style.display = 'none'
          }, 2000)
        }, 500)
      }, 500)
    })
  }

  // Initialize post visibility
  function initializePostVisibility() {
    const newsItems = document.querySelectorAll('#noticias-tab .news-item')
    const eduItems = document.querySelectorAll('#educacao-tab .news-item')

    // Hide posts beyond initial page and add fade-in animation to visible ones
    newsItems.forEach((item, index) => {
      if (index < postsPerPage) {
        item.style.opacity = '0'
        item.style.display = 'block'
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease'
          item.style.opacity = '1'
        }, 50 * index)
      } else {
        item.style.display = 'none'
      }
    })

    eduItems.forEach((item, index) => {
      if (index < postsPerPage) {
        item.style.opacity = '0'
        item.style.display = 'block'
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease'
          item.style.opacity = '1'
        }, 50 * index)
      } else {
        item.style.display = 'none'
      }
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
