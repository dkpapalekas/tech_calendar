module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    'parser': '@typescript-eslint/parser',
    'plugins': [
        '@typescript-eslint',
    ],
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'script'
    },

    'rules': {
        'no-prototype-builtins': [ 'off' ],
        'indent': [
            'error',
            3,
            {
                'SwitchCase': 1,
            },
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'brace-style': [
            'error',
            '1tbs',
            {
                'allowSingleLine': true,
            }
        ],
        'comma-style': [
            'error',
            'last',
        ],
        'no-trailing-spaces': [
            'error',
        ],
        'comma-dangle': [
            'error',
            'only-multiline',
        ],
        'comma-spacing': [
            'error',
        ],
        'key-spacing': [
            'error',
        ],
        'no-var': [
            'error'
        ],
        'prefer-const': [
            'error'
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
        '@typescript-eslint/ban-ts-comment': [
            'off',
        ],
        '@typescript-eslint/no-explicit-any': [
            'off',
        ],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'always',
        }],
        'no-warning-comments': ['warn'],
        'space-before-blocks': [
            'error',
            'always',
        ],
    }
}
