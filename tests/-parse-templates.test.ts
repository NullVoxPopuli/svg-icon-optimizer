import { stripIndent } from 'common-tags';
import { assert, test } from 'vitest';

import { extractTemplates } from '../src/-parse-templates';

// test('works on hbs literals', () => {
//   let parsed = extractTemplates(stripIndent`
//     export const hbs\`
//       hello there
//     \`
//   `);

//   assert.deepEqual(parsed, ['  hello there']);
// });

test('works on <template> tags', () => {
  let parsed = extractTemplates(stripIndent`
    <template>
      hello there
    </template>
  `);

  assert.deepEqual(parsed, ['\n  hello there\n']);
});

test('works on <template> tags', () => {
  let parsed = extractTemplates(stripIndent`
    export const A = <template>
      hello there!
    </template>

    export const B = <template>
      general kenobi!
    </template>
  `);

  assert.deepEqual(parsed, ['\n  hello there!\n', '\n  general kenobi!\n']);
});
