const rds = require('ali-rds');
const co = require('co');

class AsyncAliRds {
  public client: any;
  constructor(config: { [propsName: string]: any }) {
    this.client = rds(config);
  }

  /**
   * 执行原生sql语句
   * @param sql sql语句
   * @param params 拼接sql的参数
   */
  async query(sql: string, params: Array<any> = []): Promise<any> {
    const self = this;
    return await co(function*() {
      return yield self.client.query(sql, params);
    });
  }

  /**
   * 插入数据
   * @param tableName 表名
   * @param row 插入的数据, 对象或者对象数组
   */
  async insert(
    tableName: string,
    row: { [propsName: string]: any } | Array<{ [propsName: string]: any }>,
  ): Promise<any> {
    const self = this;
    return await co(function*() {
      return yield self.client.insert(tableName, row);
    });
  }

  /**
   * 更新单条数据
   * @param tableName 表名
   * @param row 行数据(会默认根据id去更新数据)
   * @param operation 其它的参数补充
   */
  async update(
    tableName: string,
    row: { [propsName: string]: any },
    operation?: { [propsName: string]: any },
  ): Promise<any> {
    const self = this;
    return await co(function*() {
      return yield self.client.update(tableName, row, operation);
    });
  }

  /**
   * 更新多条数据
   * @param tableName 表名
   * @param rows 需要更新的数组对象
   */
  async updateRows(
    tableName: string,
    rows: Array<{ [propsName: string]: any }>,
  ): Promise<any> {
    const self = this;
    return await co(function*() {
      return yield self.client.updateRows(tableName, rows);
    });
  }

  /**
   * 简单根据条件查询数据
   * @param tableName 表名
   * @param operation 过滤条件
   */
  async get(
    tableName: string,
    operation: { [propsName: string]: any },
  ): Promise<any> {
    const self = this;
    return await co(function*() {
      return yield self.client.get(tableName, operation);
    });
  }

  /**
   * 查询数据
   * @param tableName
   * @param operation
   */
  async select(
    tableName: string,
    operation?: { [propsName: string]: any },
  ): Promise<any> {
    const self = this;
    return await co(function*() {
      return yield self.client.select(tableName, operation);
    });
  }

  /**
   * 根据条件删除数据
   * @param tableName
   * @param operation
   */
  async delete(
    tableName: string,
    operation: { [propsName: string]: any },
  ): Promise<any> {
    const self = this;
    return await co(function*() {
      return yield self.client.delete(tableName, operation);
    });
  }

  /**
   * 根据条件查询记录数
   * @param tableName
   * @param operation
   */
  async count(
    tableName: string,
    operation?: { [propsName: string]: any },
  ): Promise<any> {
    const self = this;
    return await co(function*() {
      return yield self.client.count(tableName, operation);
    });
  }
  /**
   * 开启事务
   */
  beginTransaction(): { commit: () => void; rollback: () => void } {
    const self = this;
    return co(function*() {
      return yield self.client.beginTransaction();
    });
  }
}

export default AsyncAliRds;
export { AsyncAliRds };
