import API_KEY from "./apikey.js";

let allArticles;
const recentSection = document.querySelector(".recent");

// const base_url = `https://newsapi.org/v2/everything?q=Apple&from=2024-11-15&sortBy=popularity&apiKey=${API_KEY}`;

window.addEventListener("scroll", () => {
    document.getElementById("title").classList.toggle("sticky", window.scrollY > 0);
})

// const scrollWatcher = document.createElement("div");
// scrollWatcher.setAttribute("data-scroll-watcher", "");
// header.after(scrollWatcher);

// const navObserver = new IntersectionObserver((entries) => {
//     console.log(entries);
//     header.classList.toggle("sticky", entries[0].isIntersecting)
// });

// navObserver.observe(scrollWatcher);


const headlines = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            allArticles = data.articles.filter((item) => {
                return item.content != '[Removed]' && item.urlToImage;
            })
            displayLatest(allArticles[0]);
            displayArticles(allArticles.slice(1,));
        });
}


const displayLatest = (item) => {
    // console.log(item);

    document.querySelector(".featured").style.backgroundImage = `url(${item.urlToImage})`;
    const featured = document.querySelector(".featured-content");

    let heading = document.createElement("h1");
    heading.innerHTML = item.title;
    featured.appendChild(heading);

    let description = document.createElement("p");
    description.innerHTML = item.description;
    featured.appendChild(description);
}


const displayArticles = (data) => {
    data.forEach((item) => {
        // console.log(item);
        let recentPost = document.createElement("div");
        recentPost.className = "recent-post";

        let img = document.createElement("img");
        img.className = "img";
        img.src = item.urlToImage;
        recentPost.appendChild(img);

        let content = document.createElement("div");
        content.className = "content";

        let heading = document.createElement("h3");
        heading.innerHTML = item.title;
        content.appendChild(heading);

        let description = document.createElement("p");
        description.className = "description";
        description.innerHTML = item.description;
        description.title = item.description;
        content.appendChild(description);

        recentPost.appendChild(content);

        let page = document.createElement("a");
        page.href = item.url;
        page.appendChild(recentPost);

        recentSection.appendChild(page);

    })
}


headlines();