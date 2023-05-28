const users = [
    {
        mail: 'dasizisman480@gmail.com', name: 'dasi',  password: '123', concats:  [
            {
                labels: ['family'],
                mail: 'f1'
            },
            {
                labels: ['family', 'job'],
                mail: 'aa'
            },
            {
                labels: ['job'],
                mail: 'bda'
            },
            {
                labels: ['job'],
                mail: 'ratr'
            },
            {
                labels: [],
                mail: 'wr'
            }
        ]
    }, 
    
]

const xhr = new FXMLHttpRequest();
xhr.open('POST', 'KeepInTouch');
xhr.send({users});