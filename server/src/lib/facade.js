'use strict'

class Facade {
  constructor(Schema) {
    this.Schema = Schema;
  }

  create(body) {
    const schema = new this.Schema(body);
    return schema.save();
  }

  find(...args) {
    return this.Schema
      .find(...args)
      .exec();
  }

  findOne(...args) {
    return this.Schema
      .findOne(...args)
      .exec();
  }

  findById(...args) {
    return this.Schema
      .findById(...args)
      .exec();
  }

  update(...args) {
    return this.Schema
      .update(...args)
      .exec();
  }

  remove(...args) {
    return this.Schema
      .remove(...args)
      .exec();
  }

  async addToSet(which, key, array) {
    const doc = await this.findOne(which)
    const obj = {}
    obj[key] = {$each: array}
    await doc.update({$addToSet: obj})
    await doc.save()
  }

}

module.exports = Facade;
