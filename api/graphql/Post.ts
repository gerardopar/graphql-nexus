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
});