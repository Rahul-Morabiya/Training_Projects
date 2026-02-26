import {debounce} from "./debounce.js";
import {searchMovies} from "./api/api.js";
import {saveSearch,getSearches} from "./storage.js";
import { throttle } from "./throttle.js";

const input=document.getElementById("searchInput");
const grid=document.getElementById("movieGrid");
const status=document.getElementById("status");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const pageInfo=document.getElementById("pageInfo");
const recentEl=document.getElementById("recentSearches");
const paginationEl=document.getElementById("pagination");

let currentPage=1;
let currentQuery="";

const renderRecent=()=>{
    const searches=getSearches();
    recentEl.innerHTML="Recent Searches : "+searches
        .map(q=>`<button class="recent-btn">${q}</button>`)
        .join("");

    document.querySelectorAll(".recent-btn").forEach(btn=>btn.addEventListener("click",()=>{debouncedSearch(btn.textContent);input.value=btn.textContent;currentQuery=btn.textContent;currentPage=1;}) );
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
        console.log(data);
        let totalPages=Math.floor(data.totalResults/10);
        if(data.totalResults%5!=0)totalPages++;

        renderMovies(data.Search);
        pageInfo.textContent=`Page ${currentPage}/${totalPages}`;
        saveSearch(currentQuery);
        renderRecent();
        status.textContent="";
        paginationEl.classList.remove('hidden');
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
        throttledPrev();
    }
}

const throttledNext=throttle(()=>{
    currentPage++;
    fetchAndRender();
},1000);

const throttledPrev=throttle(()=>{
    currentPage--;
    fetchAndRender();
},1000);

nextBtn.onclick=()=>{
    throttledNext();
}

renderRecent();