// blog.js - Search and tag filtering for the blog page

document.addEventListener('DOMContentLoaded', () => {
    const searchInput    = document.getElementById('blog-search');
    const filterToggle   = document.getElementById('filter-toggle');
    const filterDropdown = document.getElementById('filter-dropdown');
    const tagButtons     = document.querySelectorAll('.tag-filter');
    const posts          = document.querySelectorAll('.blog-post');
    const noResults      = document.getElementById('no-results');

    const activeTags = new Set(); // empty = show all (same as "All")
    let searchQuery  = '';

    // --- Filter dropdown toggle ---
    filterToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle('open');
        filterToggle.classList.toggle('active');
    });

    // Close dropdown when clicking anywhere outside it
    document.addEventListener('click', (e) => {
        if (!filterToggle.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.classList.remove('open');
            filterToggle.classList.remove('active');
        }
    });

    // --- Filtering logic ---
    function filterPosts() {
        let visible = 0;

        posts.forEach(post => {
            const postTags    = (post.dataset.tags || '').split(',');
            const title       = post.querySelector('h2').textContent.toLowerCase();
            const matchesTag  = activeTags.size === 0 || [...activeTags].every(t => postTags.includes(t));
            const matchesSearch = searchQuery === '' || title.includes(searchQuery);

            post.style.display = (matchesTag && matchesSearch) ? '' : 'none';
            if (matchesTag && matchesSearch) visible++;
        });

        noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    function syncButtonStates() {
        tagButtons.forEach(btn => {
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                btn.classList.toggle('active', activeTags.size === 0);
            } else {
                btn.classList.toggle('active', activeTags.has(filter));
            }
        });
    }

    searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.toLowerCase().trim();
        filterPosts();
    });

    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            if (filter === 'all') {
                activeTags.clear();
            } else {
                if (activeTags.has(filter)) {
                    activeTags.delete(filter);
                } else {
                    activeTags.add(filter);
                }
            }

            syncButtonStates();
            filterPosts();
        });
    });

    // Initialise
    syncButtonStates();
});
