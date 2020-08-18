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

schema.extendType({
    type: 'Query',
    definition(t) {
        t.crud.user()
        t.crud.users()
    }
});

schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.crud.createOneUser()
    }
});

// schema.queryType({
//     definition(t) {
//         t.crud.user()
//         t.crud.users({
//             ordering: true,
//         })
//     },
// })

// schema.mutationType({
//     definition(t) {
//         t.crud.createOneUser()
//     },
// })