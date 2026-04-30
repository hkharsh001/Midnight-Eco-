document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const loader = document.getElementById("loader");
    let isLoading = false;

    // Sample data simulating a database of wallpapers
    const wallpapers = [
        { title: "Neon Tokyo", src: "https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&w=600&q=80", height: "400px" },
        { title: "Cinematic Sunset", src: "https://images.unsplash.com/photo-1506744626753-dba37c25981?auto=format&fit=crop&w=600&q=80", height: "600px" },
        { title: "Sci-Fi Concept", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", height: "300px" },
        { title: "Anime Vibes", src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80", height: "500px" },
        { title: "Stranger Nights", src: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=600&q=80", height: "450px" },
        { title: "Abstract Flow", src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80", height: "350px" }
    ];

    // Function to append images (instead of replacing them)
    function appendWallpapers(images) {
        images.forEach(imgData => {
            const item = document.createElement("div");
            item.className = "grid-item";

            item.innerHTML = `
                <img src="${imgData.src}" alt="${imgData.title}" style="height: ${imgData.height}; object-fit: cover;">
                <div class="overlay">
                    <span class="image-title">${imgData.title}</span>
                    <button class="download-btn">Download</button>
                </div>
            `;
            gallery.appendChild(item);
        });
    }

    // Initial load on page start
    appendWallpapers(wallpapers);

    // --- INFINITE SCROLL LOGIC ---
    window.addEventListener("scroll", () => {
        // Calculate how far the user has scrolled
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;

        // If the user is within 300px of the bottom, load more
        if (scrolled >= scrollableHeight - 300 && !isLoading) {
            loadMoreContent();
        }
    });

    function loadMoreContent() {
        isLoading = true;
        loader.classList.remove("hidden"); // Show loading text

        // Simulate a network delay (e.g., fetching from an API)
        setTimeout(() => {
            // In a real app, you'd fetch the next "page" of results from your server here.
            // For this demo, we'll just append the sample array again.
            appendWallpapers(wallpapers);
            
            isLoading = false;
            loader.classList.add("hidden"); // Hide loading text
        }, 800); // 800ms delay
    }

    // Placeholder search interaction
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", () => {
        const query = document.getElementById("searchInput").value;
        if(query) {
            console.log(`Ready to fetch results for: ${query}`);
            // Clear current gallery and load mock search results
            gallery.innerHTML = ""; 
            appendWallpapers(wallpapers.slice(0, 2)); 
        }
    });
});
