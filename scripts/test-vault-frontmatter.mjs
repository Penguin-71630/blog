import assert from 'node:assert/strict';
import { fillFrontmatter } from './vault-frontmatter.mjs';

const birthtime = new Date('2026-02-03T12:00:00Z');
const emptyFrontmatter = fillFrontmatter('---\n---\n# Note\n', birthtime);
assert.deepEqual(emptyFrontmatter, {
	updated: '---\ndate: 2026-02-03\ndescription:\npublish:\n---\n# Note\n',
	added: ['date', 'description', 'publish'],
});

const noFrontmatter = fillFrontmatter('# Note\nBody\n', birthtime);
assert.deepEqual(noFrontmatter, {
	updated: '---\ndate: 2026-02-03\ndescription:\npublish:\n---\n# Note\nBody\n',
	added: ['date', 'description', 'publish'],
});

const onlyDescription = fillFrontmatter('---\ndate: 2026-02-03\npublish:\n---\n', birthtime);
assert.deepEqual(onlyDescription, {
	updated: '---\ndate: 2026-02-03\npublish:\ndescription:\n---\n',
	added: ['description'],
});

const allFields = '---\ndate: 2026-02-03\ndescription: Existing text\npublish: true\ncustom: kept\n---\n# Note\n';
assert.deepEqual(fillFrontmatter(allFields, birthtime), { updated: allFields, added: [] });

const emptyPublish = fillFrontmatter('---\npublish:\ndate: 2026-02-03\ncustom: value\n---\n', birthtime);
assert.deepEqual(emptyPublish, {
	updated: '---\npublish:\ndate: 2026-02-03\ncustom: value\ndescription:\n---\n',
	added: ['description'],
});

const crlf = fillFrontmatter('---\r\ndescription:\r\n---\r\nbody\r\n', birthtime);
assert.deepEqual(crlf, {
	updated: '---\r\ndescription:\r\ndate: 2026-02-03\r\npublish:\r\n---\r\nbody\r\n',
	added: ['date', 'publish'],
});

const bom = fillFrontmatter('\uFEFF# Note\r\nBody\r\n', birthtime);
assert.deepEqual(bom, {
	updated: '\uFEFF---\r\ndate: 2026-02-03\r\ndescription:\r\npublish:\r\n---\r\n# Note\r\nBody\r\n',
	added: ['date', 'description', 'publish'],
});

const nearUtcMidnight = fillFrontmatter('', new Date('2026-03-01T17:30:00Z'));
assert.match(nearUtcMidnight.updated, /^---\ndate: 2026-03-02\n/);

const once = fillFrontmatter('---\ndate: 2026-02-03\n---\n# Note\n', birthtime);
const twice = fillFrontmatter(once.updated, birthtime);
assert.equal(twice.updated, once.updated);
assert.deepEqual(twice.added, []);

console.log('Vault frontmatter tests passed.');
