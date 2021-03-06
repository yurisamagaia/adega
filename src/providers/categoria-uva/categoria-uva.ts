import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CategoriaUvaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(categoria: CategoriaUva) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'INSERT INTO categoria_uva (nome) VALUES (?)';
      let data = [categoria.nome];

      return db.executeSql(sql, data).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'DELETE FROM categoria_uva WHERE id = ?';
      let data = [id];

      return db.executeSql(sql, data).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM categoria_uva ORDER BY nome';

      return db.executeSql(sql, null).then((data: any) => {
        if (data.rows.length > 0) {
          let categorias: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var categoria = data.rows.item(i);
            categorias.push(categoria);
          }
          return categorias;
        } else {
          return [];
        }
      }).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }
}

export class CategoriaUva {
  id: number;
  nome: string;
}
