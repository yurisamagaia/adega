import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CategoriaPaisProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(categoria: CategoriaPais) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'INSERT INTO categoria_pais (nome) VALUES (?)';
      let data = [categoria.nome];

      return db.executeSql(sql, data).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'DELETE FROM categoria_pais WHERE id = ?';
      let data = [id];

      return db.executeSql(sql, data).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM categoria_pais ORDER BY nome';

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

export class CategoriaPais {
  id: number;
  nome: string;
}
