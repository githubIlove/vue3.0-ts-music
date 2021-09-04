module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // '@vue/standard',
    // '@vue/typescript/recommended'
  ],
  // parser:"babel-eslint",   //安装
  // parser:"vue-eslint-parser",   //安装
  
  parserOptions: {
    ecmaVersion: 7,
    "sourceType": "module",
    parser:"babel-eslint"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
