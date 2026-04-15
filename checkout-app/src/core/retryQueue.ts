const queue: any[] = [];

export const enqueue = (fn: Function) => {
  queue.push(fn);
};

export const processQueue = async () => {
  while (queue.length) {
    const job = queue.shift();
    try {
      await job();
    } catch {
      queue.unshift(job);
      break;
    }
  }
};

window.addEventListener("online", processQueue);