export const debounce=(fn,delay=200)=>{
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer=setTimeout(()=>fn(...args),delay)
    };
};