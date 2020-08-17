import { createTestContext } from './__helpers';

const ctx = createTestContext();

it('ensures that a draft can be created and published', async () => {
    // creates a new draft
    const draftResult = await ctx.client.send( // test mutation
        `
        mutation{
            createDraft(title: "Nexus", body: "...") {
                id
                title
                body
                published
            }
        }
        `
    );

    // expected output
    expect(draftResult).toMatchInlineSnapshot(
        `
        Object {
            "createDraft": Object {
            "body": "...",
            "id": 1,
            "published": false,
            "title": "Nexus"
            },
        }
        `
    );

    // Publish the previously created draft
    const publishResult = await ctx.client.send(
        // argument definition
        `
        mutation publishDraft($postId: Int!) {
            publish(postId: $postId) {
                id
                title
                body
                published
            }
        }
        `,
    { postId: draftResult.createDraft.id } // argument value
    );

    // Snapshot the published draft and expect `published` to be true
    // expected output
    expect(publishResult).toMatchInlineSnapshot(`
        Object {
            "publish": Object {
            "body": "...",
            "id": 1,
            "published": true,
            "title": "Nexus",
            },
        }
    `);
});