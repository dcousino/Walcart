class DynamoParams {
  constructor(table, key) {
    this.TableName = table;
    if (key) {
      this.Key = {
        id: key
      };
    }
  }
}

module.exports = DynamoParams;
