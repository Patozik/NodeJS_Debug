const express = require('express');
const PORT = 3000;

const app = express();

const users = [
    { id: 1, name: 'Janek', email: 'janek@gmail.com'},
    { id: 2, name: 'Adam', email: 'adam@gmail.com'},
    { id: 3, name: 'Tomasz', email: 'tomasz@gmail.com'},
    { id: 4, name: 'Dawid', email: 'dawid@gmail.com'},
];

app.get('/', (req, res) => {
    res.send('Witaj w domu !');
});

app.get('/kontakt', (req, res) => {
    res.send('Kontakt !');
});

app.get('/profile', (req, res) => {

    let html =`Znaleziono ${users.length} profile.<br/>`;

    users.forEach(user => {
        html += `<a href="/profile/${user.id}">- ${user.name} (id: ${user.id})</a><br/>`;
    });

    res.send(html);
});

app.get('/profile/:id/:mode?', (req, res) => {

    debugger

    const { id, mode } = req.params;
    const user = users.find(x => x.id === parseInt(id));
    
    if(!user) {
        res.send('Nie ma takiego usera');
    }

    let html = (`Dane uzytkownika: imie "${user.name}"`);
    
    if (mode && mode === 'szczegoly'){
        html +=` id "${user.id}", email "${user.email}"`;
    } else if (mode && mode != 'szczegoly') {
        html = `Brak podstrony /${mode}`;
    }

    res.send(html);
});

app.listen(PORT);