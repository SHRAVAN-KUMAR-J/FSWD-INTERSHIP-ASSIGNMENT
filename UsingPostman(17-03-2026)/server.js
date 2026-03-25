const express = require('express');
const app = express();

//middleware
app.use(express.json());

//dummy database
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
];      

//=====GET METHOD====
app.get('/users', (req, res) => {
    res.status(200).json(users);
});
//=====POST METHOD=====
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    //create new user
    const newUser = {
        id: users.length + 1,
        name: name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

//=====PUT METHOD======
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    user.name = name;
    res.status(200).json(user);
});



//=====DELETE METHOD======
app.delete('/users/:id', (req, res) => {
    const id= parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.status(200).json({ message: 'User deleted successfully' }); 

});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});