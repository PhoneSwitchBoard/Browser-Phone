// Web Worker for keeping SIP registration alive in background tabs.
// Browser setTimeout/setInterval are throttled when tabs are in the background,
// but Web Worker timers run at full speed regardless of tab visibility.

let intervalId = null;

self.onmessage = function(e) {
    if (e.data.action === 'start') {
        if (intervalId) clearInterval(intervalId);
        const interval = e.data.interval || 30000; // default 30s
        intervalId = setInterval(function() {
            self.postMessage({ type: 'tick' });
        }, interval);
    } else if (e.data.action === 'stop') {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
};
