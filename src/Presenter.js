import { MODULES_RESPONSE } from './Constants';

export class Presenter {
    constructor(response, schema) {
        this.response = response;
        this.schema = schema;
    }

    async present(interactorResponse) {
        const code = interactorResponse.code;
        const response = interactorResponse.response;

        switch (code) {
            case MODULES_RESPONSE:
                this.response.send({
                    entries: [{
                        ...response,
                    }]
                });
                break;
        }
    };

    filter(response) {
        let merged = {};
        Object.keys(this.schema).forEach((key) => {
            merged[key] = response._doc[key];
        });
        return merged;
    }

    presentError(error) {
        this.response.send(error);
    };
}
