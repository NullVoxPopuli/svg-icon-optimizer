import { stripIndent } from 'common-tags';
import { assert, test } from 'vitest';

import { extractTemplates } from '../src/-parse-templates';

test('works on hbs literals', () => {
  let parsed = extractTemplates(stripIndent`
    export const hbs\`
      hello there
    \`
  `);

  assert.deepEqual(parsed, ['  hello there']);
});
