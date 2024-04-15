// logger.js

export const logState = (state) => {
  console.log('Current State:', JSON.stringify(state, null, 2));
};

export const logLifecycleEvent = (eventName, ...args) => {
  console.log(`Lifecycle Event ${eventName}:`, ...args);
};
