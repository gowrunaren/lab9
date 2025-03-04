const express = require('express');
const app = express();
const fs = require('fs');
const users = require('./users.json');

app.use(express.json());

app.get('/users', (req, res)=>{
    res.send(users);
});

const writeFiles = ()=>{
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync('./users.json',data);
}

app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    const user = users.find(u => u.id == id);
    res.send(user);
});

app.put('/users/:id', (req, res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const user = users.find(u=> u.id == id);
    user.name = name;
    writeFiles();
    res.json(`ID ${id} updated successfully!`);

});

app.post('/users', (req, res)=>{
    const id = users.length+1;
    const name = req.body.name;
    const user = {id, name};
    users.push(user);
    writeFiles();
    res.json(`New user with ${id} added successfully!`);

});

app.delete('/users/:id', (req, res)=>{
    const id = req.params.id;
    const user = users.find(u=>u.id==id);
    const index = users.indexOf(user);
    users.splice(index,1);
    writeFiles();
    res.json(`User with ID ${id} deleted successfully!`);
})

app.listen(3000, ()=>console.log("Server running on port 3000"));
