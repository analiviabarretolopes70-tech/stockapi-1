

import pool from '../config/db.js';

// INSERT — devolve o id gerado pelo AUTO_INCREMENT.
export async function criar(categoria) {
  const { nome } = categoria;

  const [resultado] = await pool.query(
    'INSERT INTO categorias (nome) VALUES (?)',
    [nome]
  );

  return resultado.insertId;
}

// SELECT * — sem JOIN, porque a categoria não depende de nenhuma outra tabela.
export async function listarTodos() {
  const [linhas] = await pool.query('SELECT * FROM categorias');
  return linhas;
}

// Devolve a categoria, ou undefined se o id não existir (o controller vira 404).
export async function buscarPorId(id) {
  const [linhas] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
  return linhas[0];
}

// UPDATE — PUT substitui o registro inteiro; aqui o "inteiro" é só o nome.
export async function atualizar(id, categoria) {
  const { nome } = categoria;

  const [resultado] = await pool.query(
    'UPDATE categorias SET nome = ? WHERE id = ?',
    [nome, id]
  );

  return resultado.affectedRows;
}

// DELETE — se existir algum produto usando esta categoria, o MySQL recusa

export async function deletar(id) {
  const [resultado] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
  return resultado.affectedRows;
}
