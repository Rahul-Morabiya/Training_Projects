const API_KEY="8a4c14b0";

export const searchMovies = async (query,page=1)=>{
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`);

    if(!res.ok)throw new Error("Network Error");

    const data=res.json();
    if(data.Response === "False") throw new Error(data.Error);

    return data;
};