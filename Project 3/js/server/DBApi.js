class PathError extends Error {
    constructor (msg) {
        super(msg);
        this.name = 'PathError';
    }
}

class Error404 extends Error {
    constructor (msg) {
        super(msg);
        this.name = '404 Error';
    }
}

class FResponse {
    constructor (json, status) {
        this.json = json;
        this.status = status;
    }
}

class DB {
    constructor (name) {
        this.name = name;
        this.data = JSON.parse(localStorage.getItem(this.name)) ?? {};
        this.save();
    }

    save () {
        localStorage.setItem(this.name, JSON.stringify(this.data))
    }

    delete (urlArray) {
        const parent = this.getElementByURL(urlArray, false);
        const last = urlArray[urlArray.length - 1];
        
        if (Array.isArray(parent)) { 
            if (!Array.isArray(last)) throw new PathError;
            
            const [key, value] = last;
            for (const [i, item] of parent.entries()) {
                if (item[key] === value) {
                    parent.splice(i, 1);
                    this.save();
                    return new FResponse({}, 200);
                }
            }
            throw new Error404;
        } else {
            if (Array.isArray(last)) throw new PathError;
            delete parent[last];
            this.save();
            return new FResponse({}, 200);
        }
    }

    post (urlArray, body) {
        const parent = this.getElementByURL(urlArray);

        if (Array.isArray(parent)) {
            parent.push(body);
        } else {
            const [key] = Object.keys(body)
            parent[key] = body[key];
        }

        this.save();
        return new FResponse({}, 200);
    }

    put (urlArray, body) {
        const parent = this.getElementByURL(urlArray);

        if (!(parent instanceof Object)) throw new PathError;

        for (const key of Object.keys(body)) {
            if (Array.isArray(parent[key])) {
                parent[key] = parent[key].concat(body[key]);
            }
            else parent[key] = body[key];
        }
        this.save();
        return new FResponse({}, 200);
    }

    get (urlArray) {
        const value = this.getElementByURL(urlArray);        

        return new FResponse(JSON.parse(JSON.stringify(value)), 200);
    } 

    getBySearch (urlArray) {
        const parent = this.getElementByURL(urlArray);        

        const searchObject = urlArray.search; // example: {lables: ['family', 'job'], text: ['name', 'a'], sortKey: name, age: 2}
        const result = [];

        for (const item of parent) {    
            if (DB.isSuitableToSearch(item, searchObject)) {
                result.push(item);
            }
        }

        const {sortKey} = searchObject;
        result.sort( (a, b) => {
            if (a[sortKey] < b[sortKey]) return -1;
            if (a[sortKey] > b[sortKey]) return 1;
            return 0;
        })

        return new FResponse(result, 200);
    }

    getElementByURL (urlArray, includeLast = true) {        
        if (urlArray.splice(0, 1)[0] !== this.name) {
            throw new PathError;
        }

        if (!includeLast) {
            urlArray = urlArray.slice(0, urlArray.length - 1);
        }

        let temp = this.data;
        for (const part of urlArray) {
            
            if (Array.isArray(part)) {
                temp = this.getElementByKeyValue(temp, part)
            } else {
                temp = this.getElementByProp(temp, part);
            }
            
        }

        return temp;
    }
    
    getElementByProp (parent, prop) {
        const element = parent[prop];
        if (!element) throw new Error404;
        return element;
    }

    getElementByKeyValue (parent, [key, value]) {
        for (const item of parent) {
            if (item[key] === value) {
                return item;
            }
        }
        throw new Error404;
    }

    static isSuitableToSearch(object, searchObject) { 
        // example for searchObject: {name: 'moshe', text: ['phoneNumber', '021'], labels: ['a', 'b', 'c']}

        // the prop is an array of options
        for (const key of Object.keys(searchObject)) { 
            if (key === 'sortKey') continue;

            if (key === 'text') {
                const regex = new RegExp(searchObject.text[1], 'i');

                let isSuitable = false;

                for (const option of searchObject.text.keys) {
                    if (regex.test(object[option])) {
                        isSuitable = true;
                        break;
                    }
                }
                if (!isSuitable) return false; 
                  
            } else if (Array.isArray(searchObject[key])) {
                let isSuitable = false;

                for (const option of searchObject[key]) {
                    if (object[key].includes(option)) {
                        isSuitable = true;
                        break;
                    }
                }

                if (!isSuitable) return false;
 
            } else {
                if (object[key] !== searchObject[key]) return false;
            }
        }
        return true;
    }
}

const DBApi = new DB('KeepInTouch');
if (!DBApi.data.users) {
    DBApi.data.users = [];
    DBApi.save();
}




// [
//     // "myApp",
//     "users",
//     ["name","moshe"],
//     // "Contacts"
// ];

// {
//     users: [
//         {name: 'moshe', age: 3, etc: [1, 2, 3]}, 
//         {name: 'b', age: 6, etc: [1, 2, 3]}, 
//     ]
// }

// // the parent is an object and the last is not an array 
// delete users[0].etc;

// // the parent is an array and the last is an array
// users.splice(0, 1);

// myApp/users

