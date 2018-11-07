import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProdutoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(produto: Produto) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'INSERT INTO produto (nome, foto, estoque, id_categoria_tipo, id_categoria_pais, id_categoria_uva, regiao, safra, teor_alcoolico, fechamento, vinicola, volume, validade, ativo, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      let data = [
        produto.nome,
        produto.foto,
        produto.estoque,
        produto.id_categoria_tipo,
        produto.id_categoria_pais,
        produto.id_categoria_uva,
        produto.regiao,
        produto.safra,
        produto.teor_alcoolico,
        produto.fechamento,
        produto.vinicola,
        produto.volume,
        produto.validade,
        produto.ativo ? 1 : 0,
        produto.descricao
      ];

      return db.executeSql(sql, data).catch((e) => console.error(JSON.stringify(e)));
    }).catch((e) => console.error(JSON.stringify(e)));
  }

  public update(produto: Produto) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'UPDATE produto SET nome = ?, foto = ?, estoque = ?, id_categoria_tipo = ?, id_categoria_pais = ?, id_categoria_uva = ?, regiao = ?, safra = ?, teor_alcoolico = ?, fechamento = ?, vinicola = ?, volume = ?, validade = ?, ativo = ?, descricao = ? where id = ?';
      let data = [
        produto.nome,
        produto.foto,
        produto.estoque,
        produto.id_categoria_tipo,
        produto.id_categoria_pais,
        produto.id_categoria_uva,
        produto.regiao,
        produto.safra,
        produto.teor_alcoolico,
        produto.fechamento,
        produto.vinicola,
        produto.volume,
        produto.validade,
        produto.ativo ? 1 : 0,
        produto.descricao,
        produto.id
      ];

      return db.executeSql(sql, data).catch((e) => console.error(e));
    }).catch((e) => console.error(JSON.stringify(e)));
  }

  public remove(id: number) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'DELETE FROM produto WHERE id = ?';
      let data = [id];

      return db.executeSql(sql, data).catch((e) => console.error(e));
    }).catch((e) => console.error(JSON.stringify(e)));
  }

  public get(id: number) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'SELECT p.*, ct.nome as categoria_tipo, cp.nome as categoria_pais, cu.nome as categoria_uva FROM produto p INNER JOIN categoria_tipo ct ON p.id_categoria_tipo = ct.id INNER JOIN categoria_pais cp ON p.id_categoria_pais = cp.id INNER JOIN categoria_uva cu ON p.id_categoria_uva = cu.id WHERE p.id = ?';
      let data = [id];

      return db.executeSql(sql, data).then((data: any) => {
        if (data.rows.length > 0) {
          let item = data.rows.item(0);
          return item;
        }

        return null;
      }).catch((e) => console.error(JSON.stringify(e)));
    }).catch((e) => console.error(JSON.stringify(e)));
  }

  public getAll(ativo: boolean, nome: string = null) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'SELECT p.*, ct.nome as categoria_tipo, cp.nome as categoria_pais, cu.nome as categoria_uva FROM produto p INNER JOIN categoria_tipo ct ON p.id_categoria_tipo = ct.id INNER JOIN categoria_pais cp ON p.id_categoria_pais = cp.id INNER JOIN categoria_uva cu ON p.id_categoria_uva = cu.id WHERE p.ativo = ?';
      var data: any[] = [ativo ? 1 : 0];

      if (nome) {
        sql += ' AND (p.nome LIKE ? OR categoria_tipo LIKE ? OR categoria_pais LIKE ? OR categoria_uva LIKE ? OR p.regiao LIKE ? OR p.safra LIKE ? OR p.teor_alcoolico LIKE ? OR p.fechamento LIKE ? OR p.vinicola LIKE ? OR p.volume LIKE ? OR p.validade LIKE ?)'
        data.push('%' + nome + '%', '%' + nome + '%', '%' + nome + '%', '%' + nome + '%', '%' + nome + '%', '%' + nome + '%', '%' + nome + '%', '%' + nome + '%', '%' + nome + '%', '%' + nome + '%', '%' + nome + '%');
      }

      return db.executeSql(sql, data).then((data: any) => {
        if (data.rows.length > 0) {
          let produtos: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var produto = data.rows.item(i);
            produtos.push(produto);
          }
          return produtos;
        } else {
          return [];
        }
      }).catch((e) => console.error(JSON.stringify(e)));
    }).catch((e) => console.error(JSON.stringify(e)));
  }

  public getAllExport() {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'SELECT p.*, ct.nome as categoria_tipo, cp.nome as categoria_pais, cu.nome as categoria_uva FROM produto p INNER JOIN categoria_tipo ct ON p.id_categoria_tipo = ct.id INNER JOIN categoria_pais cp ON p.id_categoria_pais = cp.id INNER JOIN categoria_uva cu ON p.id_categoria_uva = cu.id';

      return db.executeSql(sql, null).then((data: any) => {
        if (data.rows.length > 0) {
          let produtos: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var produto = data.rows.item(i);
            produtos.push(produto);
          }
          return produtos;
        } else {
          return [];
        }
      }).catch((e) => console.error(JSON.stringify(e)));
    }).catch((e) => console.error(JSON.stringify(e)));
  }
}

export class Produto {
  id: number;
  nome: string;
  foto: string;
  estoque: number = 0;
  id_categoria_tipo: number;
  id_categoria_pais: number;
  id_categoria_uva: number;
  regiao: string;
  safra: number;
  teor_alcoolico: string;
  fechamento: string;
  vinicola: string;
  volume: number;
  validade: number;
  ativo: boolean = true;
  descricao: string;
}
