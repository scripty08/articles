import { BaseRepository } from './BaseRepository';
import { Logger } from '@scripty/logger/src/Logger';

export class Repository extends BaseRepository {

    constructor(Schema, db, collection) {
        super(Schema, db, collection);
    }

    async read(query) {
        try {
            await this.model.find(query);
        } catch (e) {
            Logger.error(e);
        }
    };

    async update(query) {
        let { _id, title, html } = query;

        if (!_id) {
            _id = new this.db.mongo.ObjectID()
        }

        try {
            await this.model.findOneAndUpdate(
                { _id },
                {
                    $set: {
                        title,
                        html,
                    }
                },
                { new: true, upsert: true }
            );
        } catch (e) {
            Logger.error(e);
        }
    }

    async destroy(query) {
        let { _id } = query;
        try {
            await this.model.findByIdAndRemove(_id);
        } catch (e) {
            Logger.error(e);
        }
    }
}
