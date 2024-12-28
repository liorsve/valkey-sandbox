module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  overrides: [
    {
      files: ["frontend/**/*.{js,vue}"],
      env: {
        browser: true,
      },
      extends: ["plugin:vue/vue3-essential"],
    },
    {
      files: ["backend/**/*.js"],
      env: {
        node: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2022,
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    sourceType: "module",
  },
  rules: {
    "vue/no-unused-vars": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "vue/no-multiple-template-root": "off",
    "vue/no-v-model-argument": "off",
    "vue/html-indent": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/require-default-prop": "off",
    "vue/require-prop-types": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/valid-v-slot": "off",
    "vue/order-in-components": "off",
    "vue/attributes-order": "off",
    "vue/attribute-hyphenation": "off",
    "vue/first-attribute-linebreak": "off",
    "vue/require-explicit-emits": "off",
  },
};
