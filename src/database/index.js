import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// Importar o model User
import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Subscribers from '../app/models/Subscribers';

import databaseConfig from '../config/database';

const models = [User, File, Meetup, Subscribers];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // Conexão com o DB
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27018/meetapp',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
