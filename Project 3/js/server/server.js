const Server = {
    requset (requestDetails) {
        const {method, url, body} = requestDetails;
        const urlArray = url.split('/').map(path => /=/.test(path) && !/^search[?]/.test(path)? path.split('='): path);

        switch (method) {
            case "GET": {
                // if the end of the url is a "search?"
                if (/^search[?]/.test(urlArray[urlArray.length - 1])) {
                    // split the search request
                    const searchKeys = urlArray[urlArray.length - 1].replace('search?', '').split('&').map(k => k.split('='));
                    const searchObject = {};
                    for (let i = 0; i < searchKeys.length; ++i) {
                        const regex = /^~([|\w]+):(\w*)~$/;

                        
                        if (searchKeys[i][0] === 'text' && regex.test(searchKeys[i][1])) { 
                            let [, keys, text] = searchKeys[i][1].match(regex);
                            keys = keys.split('|');
                            searchKeys[i][1] = {keys, text};
                        }
                        // split by "|"
                        else if (searchKeys[i][1].indexOf('|') !== -1) {
                            searchKeys[i][1] = searchKeys[i][1].split('|').filter(Boolean);

                        // is the prop a regex? 
                        } else if (searchKeys[i][0] === 'text' && regex.test(searchKeys[i][1])) { 
                            const [, key, value] = searchKeys[i][1].match(regex);
                            searchKeys[i][1] = [key, value];
                        }
                        searchObject[searchKeys[i][0]] = searchKeys[i][1];
                    }
                    urlArray.splice(urlArray.length - 1, 1)
                    urlArray.search = searchObject;
                    console.log(urlArray);
                    return DBApi.getBySearch(urlArray);
                }
                return DBApi.get(urlArray);
            }
            case "POST": {
                return DBApi.post(urlArray, body);
            }
            case "PUT": {
                return DBApi.put(urlArray, body);
            }
            case "DELETE": {
                return DBApi.delete(urlArray);
            }
            default: {
                throw new Error('Invalid method');
            }
        }
    }
}

// GET >>
//  myApp/users
//  myApp/users/name=moshe
//  myApp/users/name=moshe/Contacts
//  myApp/users/name=moshe/Contacts/search?labels=freind|family&text=~firstName|lastName|phone|cellphone|mail:a~&sortKey=name
//  NO BODY!!


// POST >>
//  myApp/users
//  myApp/users/name=moshe/Contacts

// PUT >>
//  myApp/users/name=moshe/Contacts/phoneNumber=123
//  BODY
// { nickname: 'new', age: 2}


// DELETE >>
//  NO BODY!!
//  myApp/users
//  myApp/users/name=moshe
//  myApp/users/name=moshe/Contacts
//  myApp/users/name=moshe/Contacts/phoneNumber=123