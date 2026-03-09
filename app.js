const express = require('express');
const app = express();

app.use(express.json());

let users = [];

/* AUTH */

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization !== "fha5HpDXSXSjKU0QCbdXiz1a") {
        return res.status(403).json({ message: "No autorizado"});
    }

    next ();
}

app.use(authMiddleware);

/* TOKEN */

const tokenMiddleware = (req, res, next) => {
    if(req.method !== "GET") {
        const token = req.headers.token;

        if(token !== "HIZe4D32twWOUP9h0I1IVTlr"){
            return res.status(403).json({message:"Token inválido"});
        }
    }

    next();
};


/*POST */

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', (req, res) => {

    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);

    res.json(newUser);
})

/* PUT */

app.put('/users/:id', (req,res) => {
    const id = req.params.id;
    const user = users.find(u => u.id == id);

    if (!user) {
        return res.status(404).json({message: "Usuario no encontrado"});
    }

    user.name = req.body.name;

    res.json(user);
});

/* DELETE */

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    users = users.filter(u => u.id != id);

    res.json({message: "Usuario eliminado"});
});



app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
})