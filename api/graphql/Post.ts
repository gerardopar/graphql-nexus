import { schema } from 'nexus';

// Post object-type definition
schema.objectType({
    name: 'Post', // <- Name of your (object) type
    definition(t) {
        t.int('id')  // id of type 'Int'
        t.string('title') // title of type 'string'
        t.string('body') // body of type 'string'
        t.boolean('published') // published of type 'boolean'
    },
})

// Post Query 
schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('drafts', { // field name
            nullable: false, // clients will always get a value for this field
            type: 'Post', // field type
            list: true, // [Post] <- list type 
            resolve(_root, args, ctx) { // access context
                return ctx.db.posts.filter((p) => p.published === false); // filter posts
            }
        })
    },
})

// Post Mutation (create a post draft...)
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createDraft', {
            type: 'Post',
            nullable: false,
            args: { // mutation arguments
                title: schema.stringArg({ required: true }),
                body: schema.stringArg({ required: true })
            },
            resolve(_root, args, ctx) { // access context
                const draft = {  // draft object 
                    id: ctx.db.posts.length + 1,
                    title: args.title, // args.title
                    body: args.body, // args.body
                    published: false
                };
                ctx.db.posts.push(draft); // push new draft into db.ctx.posts
                return draft; // return the draft added
            }
        })
    }
});
