import tseslint from "typescript-eslint";

export default tseslint.config(
    // Never lint generated or vendored output
    {
        ignores: ["build/**", "docs/**", "node_modules/**"],
    },

    // Type-aware recommended rules for all TypeScript source
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // Project ruleset. No stylistic/formatting rules on purpose — Allman brace
    // style is intentional and left untouched.
    {
        files: ["**/*.ts"],
        rules: {
            // Genuine-bug rules — keep as errors
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": "error",
            "@typescript-eslint/no-unused-expressions": "error",

            // Cleanup — warn (underscore-prefixed names are intentionally unused)
            "@typescript-eslint/no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            }],

            // A GraphQL client is inherently dynamically typed at the response
            // boundary, so the `any`/unsafe family fights the design instead of
            // finding bugs — it produced ~380 unactionable warnings. Off to keep
            // lint output signal-dense. Re-enable (as warn) if response typing is
            // ever tightened. Same story for the intentional `{}` builder generics.
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/require-await": "off",
        },
    },

    // The flat config file itself is plain JS — don't type-check it
    {
        files: ["**/*.js"],
        ...tseslint.configs.disableTypeChecked,
    },
);
