export const saveSearch = (query) => {
    const searches = JSON.parse(localStorage.getItem("recent")) || [];
    const updated =[query, ...searches.filter(q=>q!==query)].slice(0,5);
    localStorage.setItem("recent",JSON.stringify(updated));
}

export const getSearches=()=>{
    JSON.parse(localStorage.getItem("recent")) || [];
}