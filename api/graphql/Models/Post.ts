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
    }
});

// query drafts (un published posts)
schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('drafts', { // query name
            nullable: false,
            type: 'Post', // object type
            list: true,
            resolve(_root, args, ctx) { 
                return ctx.db.post.findMany({ where: { published: false } });
            }
        })
    },
});

// query posts (published posts)
schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('posts', { // query name
            nullable: false,
            type: 'Post', // object type
            list: true,
            resolve(_root, args, ctx) { 
                return ctx.db.post.findMany({ where: { published: true } });
            }
        })
    },
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

// publish one draft...
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('publishOneDraft', {
            type: 'Post',
            nullable: false,
            args: { // mutation arguments
                draftId: schema.intArg({ required: true })
            },
            resolve(_root, args, ctx) {
                return ctx.db.post.update({
                    where: {
                        id: args.draftId
                    },
                    data: {
                        published: true
                    }
                });
            }
        });
    }
});