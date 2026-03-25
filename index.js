const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

// 🔹 Obtener usuarios
app.get('/usuarios', async (req, res) => {
  const result = await pool.query('SELECT * FROM usuarios');
  res.json(result.rows);
});

// 🔹 Crear usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, email } = req.body;
  const result = await pool.query(
    'INSERT INTO usuarios(nombre, email) VALUES($1, $2) RETURNING *',
    [nombre, email]
  );
  res.json(result.rows[0]);
});

// 🔹 Actualizar usuario
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  const result = await pool.query(
    'UPDATE usuarios SET nombre=$1, email=$2 WHERE id=$3 RETURNING *',
    [nombre, email, id]
  );

  res.json(result.rows[0]);
});

// 🔹 Eliminar usuario
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM usuarios WHERE id=$1', [id]);

  res.json({ mensaje: 'Usuario eliminado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));