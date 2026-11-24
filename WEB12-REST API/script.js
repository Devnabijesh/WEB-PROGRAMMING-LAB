
let articles = [];

async function getNews() {
    let news = document.getElementById("news");

    news.innerHTML = '<p class="message">Loading latest news...</p>';

    try {
        let response = await fetch(
            "https://hacker-news.firebaseio.com/v0/topstories.json"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch news");
        }

        let ids = await response.json();

        articles = await Promise.all(
            ids.slice(0, 15).map(async id => {
                let res = await fetch(
                    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
                );

                return await res.json();
            })
        );

        displayNews(articles);

    } catch (error) {
        news.innerHTML =
            '<p class="message">Unable to load news. Please try again.</p>';
    }
}

function displayNews(data) {
    let news = document.getElementById("news");

    if (data.length === 0) {
        news.innerHTML =
            '<p class="message">No news articles found.</p>';
        return;
    }

    news.innerHTML = "";

    data.forEach(article => {
        let date = new Date(article.time * 1000);

        let card = document.createElement("div");
        card.className = "article";

        let img = document.createElement("img");
        img.src = `https://picsum.photos/seed/${article.id}/600/350`;
        img.alt = "News thumbnail";

        let content = document.createElement("div");
        content.className = "article-content";

        let title = document.createElement("h3");
        title.textContent = article.title || "Untitled article";

        let description = document.createElement("p");
        description.textContent =
            "Read the latest story and discover more details.";

        let source = document.createElement("p");
        source.textContent = "Source: Hacker News";

        let published = document.createElement("p");
        published.textContent =
            "Published: " + date.toLocaleDateString();

        let link = document.createElement("a");
        link.textContent = "Read More";

        link.href = article.url || 
            `https://news.ycombinator.com/item?id=${article.id}`;

        link.target = "_blank";
        link.rel = "noopener noreferrer";

        content.append(title, description, source, published, link);
        card.append(img, content);
        news.appendChild(card);
    });
}

function searchNews() {
    let keyword = document.getElementById("search")
        .value.toLowerCase().trim();

    let filtered = articles.filter(article =>
        article.title.toLowerCase().includes(keyword)
    );

    displayNews(filtered);
}

// Load news automatically
getNews();
