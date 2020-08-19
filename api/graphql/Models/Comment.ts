import { schema } from 'nexus';

schema.objectType({ // * object Type based off (schema.prisma)
    name: 'Comment',
    definition(t) { // type definitions
        t.model.id()
        t.model.text()
        t.model.authorId()
        t.model.author()
        t.model.postId()
        t.model.post()
    }
});

schema.extendType({ // * auto generated queries
    type: 'Query',
    definition(t) {
        t.crud.comment()
        t.crud.comments()
    }
});

schema.extendType({ // * auto generated mutations
    type: 'Mutation',
    definition(t) {
        t.crud.createOneComment()
        t.crud.deleteOneComment()
    }
});

// * mutation to update a comment
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('updateOneComment', { // mutation name
            type: 'Comment', // field type
            nullable: false,
            args: { // mutation arguments
                commentId: schema.intArg({ required: true }),
                text: schema.stringArg({ required: true })
            },
            resolve(_root, args, ctx) { // mutation resolver
                return ctx.db.comment.update({
                    where: {
                        id: args.commentId
                    },
                    data : {
                        text: args.text
                    }
                });
            }
        });
    }
})

// schema.queryType({ // * auto generated queries
//     definition(t) {
//         t.crud.comment()
//         t.crud.comments({
//             ordering: true,
//         })
//     },
// })

// schema.mutationType({ // * auto generated mutations
//     definition(t) {
//         t.crud.createOneComment()
//     },
// })