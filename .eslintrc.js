module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/no-unresolved': 0,
    'no-useless-constructor': 0,
    'class-methods-use-this': 0,
    'func-names': 0,
    'import/extensions': ['error', { ts: 'never' }],
  },
};
