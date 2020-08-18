import { schema } from 'nexus';

schema.objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.firstName()
        t.model.lastName()
        t.model.posts()
        t.model.comments()
    }
});