// blog.js - Search and tag filtering for the blog page

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blog-search');
    const tagButtons  = document.querySelectorAll('.tag-filter');
    const posts       = document.querySelectorAll('.blog-post');
    const noResults   = document.getElementById('no-results');

    let activeTag   = 'all';
    let searchQuery = '';

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
            filterPosts();
        });
    });
});
