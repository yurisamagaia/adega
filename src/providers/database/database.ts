import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'adega.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB().then((db: SQLiteObject) => {
      this.createTables(db);
    }).catch(e => console.log(JSON.stringify(e)));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categoria_tipo (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS categoria_pais (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS categoria_uva (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS produto (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, foto TEXT, estoque integer, id_categoria_tipo integer, id_categoria_pais integer, id_categoria_uva integer, regiao TEXT, safra integer, teor_alcoolico TEXT, fechamento TEXT, vinicola TEXT, volume TEXT, validade integer, ativo integer, descricao TEXT, FOREIGN KEY(id_categoria_tipo) REFERENCES categoria_tipo(id), FOREIGN KEY(id_categoria_pais) REFERENCES  categoria_pais(id), FOREIGN KEY(id_categoria_uva) REFERENCES categoria_uva(id))']
    ]).then(() => console.log('Tabelas criadas com sucesso')).catch(e => console.error('Erro ao criar as tabelas', e));
  }
}
