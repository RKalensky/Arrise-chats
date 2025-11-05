import react from 'eslint-plugin-react';

export default [
    {
        files: ['*.js', '*.jsx'],
        languageOptions: {
            parser: '@babel/eslint-parser',
            parserOptions: {
                requireConfigFile: false,
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-vars': 'error',
            'react/jsx-uses-react': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];