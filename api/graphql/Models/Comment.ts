import { schema } from 'nexus';

schema.objectType({
    name: 'Comment',
    definition(t) {
        t.model.id()
        t.model.text()
        t.model.authorId()
        t.model.author()
        t.model.postId()
        t.model.post()
    }
});

schema.extendType({
    type: 'Query',
    definition(t) {
        t.crud.comment()
        t.crud.comments()
    }
});

schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.crud.createOneComment()
    }
});

// schema.queryType({
//     definition(t) {
//         t.crud.comment()
//         t.crud.comments({
//             ordering: true,
//         })
//     },
// })

// schema.mutationType({
//     definition(t) {
//         t.crud.createOneComment()
//     },
// })