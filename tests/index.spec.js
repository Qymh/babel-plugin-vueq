const babel = require('@babel/core');
const plugin = require('../lib/index');

it('works', () => {
  const template = `
      import {QButton} from 'vueq-mobile-ui'
    `;
  const { code } = babel.transform(template, { plugins: [plugin] });
  expect(code).toMatchSnapshot();
});

it('match vueq-mobile-ui', () => {
  const template = `
      import {QButton} from 'vueq-mobile-ui'
    `;
  const { code } = babel.transform(template, { plugins: [plugin] });
  expect(code).toMatch(/vueq-mobile-ui\/dist\/packages\/QButton\.js/);
  expect(code).toMatch(/vueq-mobile-ui\/dist\/css\/QButton\.css/);
});

it('not match vueq-mobile-ui', () => {
  const template = `
    import {QButton} from 'othermobule'
  `;
  const { code } = babel.transform(template, { plugins: [plugin] });
  expect(code).not.toMatch(/vueq-mobile-ui\/dist\/packages\/QButton\.js/);
});

it('no chunks', () => {
  const template = `
    import {} from 'vueq-mobile-ui'
  `;
  const { code } = babel.transform(template, { plugins: [plugin] });
  expect(code).not.toMatch(/\{/);
});

it('only default', () => {
  const template = `
    import vueq from 'vueq-mobile-ui'
  `;
  const { code } = babel.transform(template, { plugins: [plugin] });
  expect(code).toBe(`import vueq from 'vueq-mobile-ui';`);
});

it('defualt with specifier', () => {
  const template = `
    import vueq,{QButton} from 'vueq-mobile-ui'
  `;
  const { code } = babel.transform(template, { plugins: [plugin] });
  expect(code).toMatch(/vueq-mobile-ui\/dist\/packages\/QButton\.js/);
  expect(code).toMatch(/vueq-mobile-ui\/dist\/css\/QButton\.css/);
});

it('no css', () => {
  const template = `
    import {QCol} from 'vueq-mobile-ui'
  `;

  const { code } = babel.transform(template, { plugins: [plugin] });
  expect(code).toMatch(/vueq-mobile-ui\/dist\/packages\/QCol\.js/);
  expect(code).not.toMatch(/vueq-mobile-ui\/dist\/css\/QCol\.css/);
});
