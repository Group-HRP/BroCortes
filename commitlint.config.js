module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'build',
          'chore',
          'ci',
          'docs',
          'feat',
          'fix',
          'perf',
          'refactor',
          'revert',
          'style',
          'test'
        ]
      ],
      'subject-case': [2, 'always', 'sentence-case'],
      'header-max-length': [2, 'always', 72],
      'body-leading-blank': [2, 'always'],
      'footer-leading-blank': [1, 'always']
    }
  };