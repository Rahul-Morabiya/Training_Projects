import {debounce} from "./debounce.js";
import {searchMovies} from "./api/api.js";
import {saveSearch,getSearches} from "./storage.js";


const input=document.getElementById("searchInput");
const grid=document.getElementById("movieGrid");
const status=document.getElementById("status");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const pageInfo=document.getElementById("pageInfo");
const recentEl=document.getElementById("recentEl");

let currentPage=1;
let currentQuery="";

const renderRecent=()=>{
    const searches=getSearches();
    recentEl.innerHTML=searches
        .map(q=>`<button class="recent-btn">${q}</button>`)
        .join("");

    document.querySelectorAll(".recent-btn").forEach(btn=>btn.addEventListener("click",()=>debouncedSearch(btn.textContent)));
};

const renderMovies=(movies)=>{
    grid.innerHTML=movies.map(
        m=>`<article class="card">
                <img src="${m.Poster}" alt="${m.Title}" />
                <h3>${m.Title}</h3>
                <p>${m.Year}</p>
            </article>
            `
    ).join("");
};

const fetchAndRender= async()=>{
    if(!currentQuery)return;

    status.textContent="Loading...";

    try{
        const data=await searchMovies(currentQuery,currentPage);
        renderMovies(data.Search);
        pageInfo.textContent=`Page ${currentPage}`;
        saveSearch(currentQuery);
        renderRecent();
        status.textContent="";
    }
    catch(err){
        status.textContent=err.message;
    }
}

const debouncedSearch=debounce((query)=>{
    currentQuery=query;
    currentPage=1;
    fetchAndRender();
},600);

input.addEventListener("input",(e)=>debouncedSearch(e.target.value));

prevBtn.onclick=()=>{
    if(currentPage>1){
        currentPage--;
        fetchAndRender();
    }
}
nextBtn.onclick=()=>{
    currentPage++;
    fetchAndRender();
}

renderRecent();