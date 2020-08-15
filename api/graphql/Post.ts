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
            resolve() {
                return [{ id: 1, title: 'Nexus', body: '...', published: false }]
            }
        })
    },
})