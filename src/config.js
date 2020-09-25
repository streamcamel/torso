const hostname = window && window.location && window.location.hostname;

// Replace 'false' with 'true' when testing backend API locally.
// Note: Tests currently fail when running with `true` since they check against the full backend
// url.
const isLocal = true && window && window.location && 
                (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")

let backendHost;
if (hostname === 'www.streamcamel.com') {
    backendHost = 'https://api.streamcamel.com';
} else if (hostname === 'www.staging.streamcamel.com') {
    backendHost = 'https://api.staging.streamcamel.com';
} else if (hostname === 'www.dev.streamcamel.com') {
    backendHost = 'https://api.dev.streamcamel.com';
} else if (isLocal) {
    backendHost = 'http://localhost:8800';
} else {
    backendHost = 'https://api.streamcamel.com';
}

export function backendURL(path) {
    return backendHost + path;
}

export const trackingId = "UA-85057016-2";
