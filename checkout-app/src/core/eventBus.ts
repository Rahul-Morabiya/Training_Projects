type Event = "CART_UPDATED" | "ORDER_FAILED";

class EventBus {
  private listeners: Record<string, Function[]> = {};

  emit(event: Event, payload?: any) {
    (this.listeners[event] || []).forEach((fn) => fn(payload));
  }

  on(event: Event, fn: Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  }
}

export const eventBus = new EventBus();