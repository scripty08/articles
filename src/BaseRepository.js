
export class BaseRepository {
    constructor(requestSchema, db, collection) {
        delete db.connection.models[collection];
        const mongoSchema = new db.Schema(requestSchema, { timestamps: true });
        this.model = db.model(collection, mongoSchema);
        this.db = db;
    }

    getModel(requestSchema, db, collection) {
        delete db.connection.models[collection];
        const mongoSchema = new db.Schema(requestSchema, { timestamps: true });
        return db.model(collection, mongoSchema);
    }
}
