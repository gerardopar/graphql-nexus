import { schema } from 'nexus';

schema.objectType({ // * object Type based off (schema.prisma)
    name: 'User', // type name
    definition(t) { // type definitions
        t.model.id()
        t.model.firstName()
        t.model.lastName()
        t.model.posts()
        t.model.comments()
    }
});

schema.extendType({ // * auto generated queries
    type: 'Query',
    definition(t) {
        t.crud.user()
        t.crud.users()
    }
});

schema.extendType({ // * auto generated mutations
    type: 'Mutation',
    definition(t) {
        t.crud.createOneUser()
        t.crud.deleteOneUser()
    }
});