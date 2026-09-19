// centralizedMessageStore.js
export const MessageStore = {
  activeChannelId: 'main-chat',
  messages: {}, // { channelId: [ { id, text, sender, timestamp } ] }

  // 1. Single entry point for new incoming messages
  addMessage(channelId, message) {
    if (!this.messages[channelId]) {
      this.messages[channelId] = [];
    }
    this.messages[channelId].push(message);

    // 2. Notify ONLY the active viewing container, not global listeners
    this.notifyChannel(channelId);
  },

  listeners: new Map(),

  subscribe(channelId, callback) {
    this.listeners.set(channelId, callback);
  },

  unsubscribe(channelId) {
    this.listeners.delete(channelId);
  },

  notifyChannel(channelId) {
    const callback = this.listeners.get(channelId);
    if (callback) {
      callback(this.messages[channelId]);
    }
  }
};
