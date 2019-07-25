module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'build', 'test', 'revert']
    ],
    'header-min-length': [2, 'always', 15]
  }
};
