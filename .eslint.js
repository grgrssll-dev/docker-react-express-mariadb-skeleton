module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
    ],
    env: {
      browser: true,
      node: true,
      jest: true,
    },
    plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'import', 'jest'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      'react/state-in-constructor': 0,
      'react/static-property-placement': 0,
      'react/no-deprecated': 0,
      'react/jsx-props-no-spreading': 0,
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'jsx-a11y/label-has-associated-control': 0,
      'react/destructuring-assignment': 0,
  
      // Bug (https://github.com/facebookincubator/create-react-app/issues/2631)
      'jsx-a11y/href-no-hash': 0,
  
      'react/jsx-filename-extension': 0,
      'react/forbid-prop-types': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/label-has-for': 0,
      'jsx-a11y/media-has-caption': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      // "react/jsx-one-expression-per-line": 0,
      'import/prefer-default-export': 0,
      'react/require-default-props': 0,
      'no-console': 'warn',
      radix: 0,
      'function-paren-newline': 0,
  
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
  
      // These are enforced by typescript-eslint recommends, but were not enforced
      // by airbnb.  It would be really nice to be able to get to the point of
      // removing these overrides.
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-namespace-keyword': 'off',
    },
  