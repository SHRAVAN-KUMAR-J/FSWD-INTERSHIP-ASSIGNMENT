const express = require('express');
const router = express.Router();

// Sample user data 
router.get('/', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', dept: 'Engineering' },
        { id: 2, name: 'Jane Smith', dept: 'Marketing' },
        { id: 3, name: 'Alice Johnson', dept: 'Sales' },
    ];
    res.json(users);
}
);

router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const users = [
        { id: 1, name: 'John Doe', dept: 'Engineering' },
        { id: 2, name: 'Jane Smith', dept: 'Marketing' },
        { id: 3, name: 'Alice Johnson', dept: 'Sales' },
    ];
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    }   
    else {
        res.status(404).json({ message: 'User not found' });
    }   
});

module.exports = router;
