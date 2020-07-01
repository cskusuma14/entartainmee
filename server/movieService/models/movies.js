const { getDatabase } = require("../config/mongo");
const Movies = getDatabase().collection("Movies");
const { ObjectId } = require("mongodb");

class SeriesModel {
  static find() {
    return Movies.find().toArray();
  }
  static findById(id) {
    return Movies.findOne({ _id: ObjectId(id) });
  }
  static create(newMovie) {
    return Movies.insertOne(newMovie);
  }
  static update(id, updatedData) {
    return Movies.updateOne(
      { _id: ObjectId(id) },
      {
        $set: updatedData,
      }
    );
  }
  static delete(id) {
    return Movies.deleteOne({ _id: ObjectId(id) });
  }
}
module.exports = SeriesModel;
