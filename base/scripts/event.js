// questo deve essere eseguito prima di tutto il resto
class EventBus {
  constructor() {
    this.events = {};
  }
  on(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn);
  }
  emit(event, data) {
    (this.events[event] || []).forEach((fn) => fn(data));
  }
}
window.bus = new EventBus();
