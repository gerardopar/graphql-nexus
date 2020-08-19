import { schema } from 'nexus';

schema.objectType({ // * object Type based off (schema.prisma)
    name: 'Post', // type name
    definition(t) { // type definitions
        t.model.id()
        t.model.title()
        t.model.body()
        t.model.published()
        t.model.comments()
        t.model.authorId()
        t.model.author()
    },
});

schema.extendType({ // * auto generated queries
    type: 'Query',
    definition(t) {
        t.crud.post()
    }
});


// * query drafts (un published posts)
schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('drafts', { // field name
            nullable: false,
            type: 'Post', // object type
            list: true,
            resolve(_root, args, ctx) { // query resolver
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

schema.extendType({ // * auto generated mutations
    type: 'Mutation',
    definition(t) {
        t.crud.createOnePost()
        t.crud.deleteOnePost()
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
            resolve(_root, args, ctx) { // mutation resolver
                return ctx.db.post.create({ data: {
                    title: args.title,
                    body: args.body,
                    published: false,
                    author: {
                        connect: {
                            id: args.authorId
                        }
                    }
                }});
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
            resolve(_root, args, ctx) { // mutation resolver
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

// * mutation to update a post
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('updateOnePost', { // mutation name
            type: 'Post', // field type
            nullable: false,
            args: { // mutation arguments
                postId: schema.intArg({ required: true }),
                title: schema.stringArg({ required: true }),
                body: schema.stringArg({ required: true }),
            },
            resolve(_root, args, ctx) { // mutation resolver
                return ctx.db.post.update({
                    where: {
                        id: args.postId
                    },
                    data : {
                        title: args.title,
                        body: args.body
                    }
                });
            }
        });
    }
});

// delete one draft...
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('deleteOneDraft', {
            type: 'Post',
            nullable: false,
            args: { // mutation arguments
                draftId: schema.intArg({ required: true })
            },
            resolve(_root, args, ctx) { // mutation resolver
                return ctx.db.post.delete({
                    where: {
                        id: args.draftId
                    }
                });
            }
        });
    }
});