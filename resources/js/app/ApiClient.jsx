export default class ApiClient {

    static requestHeaders(options) {
        const default_headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }

        if (options !== undefined && options.headers !== undefined) {
            return {
                ...default_headers,
                ...headers
            }
        } else {
            return default_headers;
        }
    }

    static async get(url, options) {

        options = options === undefined ? {} : options;

        options.headers = ApiClient.requestHeaders(options);
        const default_options = {
            method: 'get'
        }
        const response = await fetch(url, {
            ...default_options,
            ...options
        })
        return response;       
    }

    static async post(url, options) {

        await fetch('/sanctum/csrf-cookie');

        options = options === undefined ? {} : options;

        options.headers = ApiClient.requestHeaders(options);

        options.headers['X-XSRF-TOKEN'] = ApiClient.getCookie('XSRF-TOKEN');

        const default_options = {
            method: 'post'
        }

        const response = await fetch(url, {
            ...default_options,
            ...options
        })

        return response;
    }

    static getCookie(name) {
        var cookieArr = document.cookie.split(";");
        for (var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            if (name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }
}