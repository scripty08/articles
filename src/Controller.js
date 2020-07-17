import { Repository } from './Repository';
import { Presenter } from './Presenter';
import { Schema } from './Model';

export class Controller {

    static component = 'articles';
    static collection = 'site_modules';

    init(server, router) {
        this.repository = new Repository(Schema, server.db, Controller.collection);
        router.get(`/${Controller.component}/read`, this.readAction.bind(this));
        router.post(`/${Controller.component}/update`, this.updateAction.bind(this));
        router.post(`/${Controller.component}/destroy`, this.destroyAction.bind(this));
        server.use(router);
    }

    readAction(req, res) {
        const presenter = new Presenter(res);
        return this.repository.read(req.query, presenter)
    }

    updateAction(req, res) {
        const presenter = new Presenter(res);
        return this.repository.update(req.body, presenter)
    }

    destroyAction(req, res) {
        const presenter = new Presenter(res);
        return this.repository.destroy(req.body, presenter)
    }
}
