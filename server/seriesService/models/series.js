const { getDatabase } = require("../config/mongo");
const Series = getDatabase().collection("TvSeries");
const { ObjectId } = require("mongodb");

class SeriesModel {
  static find() {
    return Series.find().toArray();
  }
  static findById(id) {
    return Series.findOne({ _id: ObjectId(id) });
  }
  static create(newSeries) {
    return Series.insertOne(newSeries);
  }
  static update(id, updatedData) {
    return Series.updateOne(
      { _id: ObjectId(id) },
      {
        $set: updatedData,
      }
    );
  }
  static delete(id) {
    return Series.deleteOne({ _id: ObjectId(id) });
  }
}
module.exports = SeriesModel;
