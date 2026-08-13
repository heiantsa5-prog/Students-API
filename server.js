import express from 'express';

const app = express();
const port = 3000;

let students = [
    {id: 1, firstName: "Dupont", lastName: "Lea", age: "20" },
    {id: 2, firstName: "Dupont", lastName: "Jean", age: "19" },
    {id: 3, firstName: "Dupont", lastName: "Sophia", age: "20" }
]

const nextId = 4;

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id == id);

    res.json(student);
});

app.post('/students', (req, res) => {
    const { firstName, lastName, age } = req.body; 
    const newStudent = {
        id: nextId++,
        firstName: firstName,
        age: age
    }

    if (!firstName || !lastName || !age) {
        return res.status(400).json({error : 'firstName, lastName and age are obligatory'});
    }

    students.push(newStudent);
    res.json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, age } = req.body; 
    const student = students.find(s => s.id == id);

    student.firstName = firstName;
    student.lastName = lastName;
    student.age = age;

    if (!firstName || !lastName || !age) {
        return res.status(400).json({error : 'firstName, lastName and age are obligatory'});
    }

    res.json(student);    
});

app.patch('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, age } = req.body; 
    const student = students.find(s => s.id == id);

    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (age) student.age = age;

    res.json(student);    

});

app.delete('students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.findIndex(s => s.id == id);

    students.splice(student);
    res.send();
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});