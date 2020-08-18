import { schema } from 'nexus';

schema.objectType({
    name: 'Post',
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.body()
        t.model.published()
        t.model.comments()
        t.model.authorId()
        t.model.author()
    },
});

schema.extendType({
    type: 'Query',
    definition(t) {
        t.crud.post()
        t.crud.posts()
    }
});

schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.crud.createOnePost()
    }
});

// createOneDraftMutation...
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createOneDraft', {
            type: 'Post',
            nullable: false,
            args: { // mutation arguments
                authorId: schema.intArg({ required: true }),
                title: schema.stringArg({ required: true }),
                body: schema.stringArg({ required: true })
            },
            resolve(_root, args, ctx) {
                return ctx.db.post.createOne({ data: {
                    title: args.title,
                    body: args.body,
                    published: false,
                    author: {
                        connect: {
                            id: args.authorId
                        }
                    }
                }}); // prisma client CRUD
            }
        });
    }
});