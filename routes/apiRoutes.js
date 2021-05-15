let newNotes = require('../db/newNotes');

const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {

    // Display Notes Response from Route
    app.get('/api/notes', function(req, res) {
        res.json(newNotes);
    });

    // Post New Note Option
    app.post('/api/notes', function(req, res) {
        
        let newNote = req.body;

        let lastId = newNotes[newNotes.length - 1]['id'];
        let newId = lastId + 1;
        newNote['id'] = newId;
        
        console.log('Req.body:', req.body);
        newNotes.push(newNote);

        writeFileAsync('./db/newNotes.json', JSON.stringify(newNotes)).then(function() {
            console.log('Update made to newNotes.json');
        });

        res.json(newNote);
    });

    // Delete Note Option
    app.delete('/api/notes/:id', function(req, res) {

        console.log('Req.params:', req.params);
        let chosenId = parseInt(req.params.id);
        console.log(chosenId);


        for (let i = 0; i < newNotes.length; i++) {
            if (chosenId === newNotes[i].id) {
                newNotes.splice(i,1);
                
                let noteJSON = JSON.stringify(newNotes, null, 2);
                writeFileAsync('./db/newNotes.json', noteJSON).then(function() {
                console.log ('Note Deleted.');
            });                 
            }
        }
        res.json(newNotes);   
    });   
};