module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  // extends: ['plugin:vue/recommended', 'eslint:recommended'],
  extends: [
    "plugin:vue/base",
    "eslint:recommended"
  ],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },

  'extends': [
    'plugin:vue/base',
    'plugin:vue/essential',
    'eslint:recommended'
  ]
}
