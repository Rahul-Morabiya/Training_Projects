export const throttle=(fn,delay=1000)=>{
    let lastCall=0;

    return (...args)=>{
        const now=Date.now();
        if(now-lastCall>=delay){
            lastCall=now;
            fn(...args);
        }
    };
};