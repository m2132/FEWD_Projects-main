const ERRORS = {
    200: "OK", 
    403: "Forbidden",
    404: "Not Found",
}

class FXMLHttpRequest {
    constructor () {
        this.readyState = 0;
        this.status = 0;
        this.statusText = '';
        this.response = '';

        this._requestDetails = null;

        this.onload = null;
        this.onerror = null;
    }

    open (method, url) {
        this.readyState = 1;
        this._requestDetails = {method, url};
    }

    send (body) {
        this._requestDetails.body = body ?? {};

        this.readyState = 3;
        
        let response;
        try {
            response = Server.requset(this._requestDetails);
        }
        catch (error) {
            if (error instanceof Error404) {
                response = new FResponse({}, 404);
            } else throw error;
        } 
        
        this.status = response.status;
        this.response = response.json;
        this.statusText = ERRORS[this.status];

        // did the request succeed?
        if (this.status >= 200 && this.status < 300) { 
            this.onload && this.onload(this.response);
        } else { // the request failed
            this.onerror && this.onerror(this.response);
        }

        this.readyState = 4;
    }
}