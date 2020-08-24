const hostname = window && window.location && window.location.hostname;

let backendHost;
if (hostname === 'www.streamcamel.com') {
    backendHost = 'https://api.streamcamel.com';
} else if (hostname === 'www.staging.streamcamel.com') {
    backendHost = 'https://api.staging.streamcamel.com';
} else if (hostname === 'www.dev.streamcamel.com') {
    backendHost = 'https://api.dev.streamcamel.com';
} else {
    // TODO: Make this works with localhost
    backendHost = 'https://api.streamcamel.com';
}

export function backendURL(path) {


    return backendHost + path;
}

export const trackingId = "UA-85057016-2";
