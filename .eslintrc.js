module.exports = {
        root: true,
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint', 'prettier'],
        extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'prettier'
        ],
        rules: {
                'no-console': ['warn', { allow: ['warn', 'error'] }],
                'brace-style': ['error', '1tbs', { allowSingleLine: false }],
                curly: ['error', 'all'],
                quotes: ['error', 'single', { avoidEscape: true }],
                '@typescript-eslint/no-unused-vars': 'off',
                eqeqeq: ['error', 'always'],
                'no-constant-binary-expression': 'error',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
        }
}
