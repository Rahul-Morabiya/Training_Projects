export const analytics = {
  events: [] as any[],

  track(event: string, payload?: any) {
    this.events.push({
      event,
      payload,
      time: Date.now(),
    });

    console.log("📊", event, payload);
  },

  get() {
    return this.events;
  },
};