const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const database = {
    'users':[
        {
            'id': '123',
            'name': 'John',
            'email': 'john@gmail.com',
            'password': 'cookies',
            'entries': 0,
            'joined': new Date()
        },
        {
            'id': '124',
            'name': 'Sally',
            'email': 'sal@gmail.com',
            'password': 'milk',
            'entries': 0,
            'joined': new Date()
        }
]
}

app.get('/', (req, res)=>{

    res.json(database.users);

});

app.post('/signin',(req, res)=>{

    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    }else{
        res.status(400).json('error logging in')
    }

});

app.post('/register', (req, res)=>{
    const { email, password, name } = req.body;

    database.users.push({
        'id': '125',
        'name': name,
        'email': email,
        'password': password,
        'entries': 0,
        'joined': new Date()
    });

    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res)=>{

        const { id } = req.params;
        const profile = database.users.filter(user =>{
            if(user.id === id){
                return user;
            }
        });

        profile.length > 0 ? res.json(profile) : res.status(404).json('user not found');

});

app.put('/image', (req, res)=>{

        const { id } = req.body;
        const profile = database.users.filter(user =>{
            if(user.id === id){
                user.entries++;
                return user;
            }
        });

        profile.length > 0 ? res.json(profile[0].entries) : res.status(404).json('user not found');

});

bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", "hash", function(err, res) {
    // res == true
});
bcrypt.compare("veggies", "hash", function(err, res) {
    // res = false
});


app.listen(4000,()=>{
    console.log("Server up on port 4000!!!");
});