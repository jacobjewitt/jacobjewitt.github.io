// blog.js - Search and tag filtering for the blog page

document.addEventListener('DOMContentLoaded', () => {
    const searchInput    = document.getElementById('blog-search');
    const filterToggle   = document.getElementById('filter-toggle');
    const filterDropdown = document.getElementById('filter-dropdown');
    const tagButtons     = document.querySelectorAll('.tag-filter');
    const posts          = document.querySelectorAll('.blog-post');
    const noResults      = document.getElementById('no-results');

    let activeTag   = 'all';
    let searchQuery = '';

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
            const tags  = (post.dataset.tags || '').split(',');
            const title = post.querySelector('h2').textContent.toLowerCase();

            const matchesTag    = activeTag === 'all' || tags.includes(activeTag);
            const matchesSearch = searchQuery === '' || title.includes(searchQuery);

            post.style.display = (matchesTag && matchesSearch) ? '' : 'none';
            if (matchesTag && matchesSearch) visible++;
        });

        noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.toLowerCase().trim();
        filterPosts();
    });

    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tagButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTag = btn.dataset.filter;

            // Close dropdown after selecting a tag
            filterDropdown.classList.remove('open');
            filterToggle.classList.remove('active');

            filterPosts();
        });
    });
});
