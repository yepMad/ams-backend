module.exports = {
    "env": {
        "es2021": true,
        "node": true,
        "jest": true
    },
    "root": true,
    "ignorePatterns": [".eslintrc.js"],
    "extends": [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/eslint-plugin",
        "prettier"
    ],
    "rules": {
			"@typescript-eslint/no-use-before-define": ["error"],
      "import/no-default-export": ["error"],
      "@typescript-eslint/explicit-function-return-type": ["error"],
	   	"import/extensions": [
	      "error",
	      "ignorePackages",
	      {
	        "ts": "never"
	      }
	    ],
      "prettier/prettier": "error",
      "import/prefer-default-export": "off",
      "class-methods-use-this": "off",
      "no-useless-constructor": "off",
      "max-classes-per-file": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "no-underscore-dangle": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          "devDependencies": [
            "test.{ts,tsx}",
            "test-*.{ts,tsx}",
            "**/*{.,_}{test,spec,mock}.{ts,tsx}",
            "**/jest.config.ts",
            "**/jest.setup.ts",
            "**/*.d.ts"
          ],
          "optionalDependencies": false
        }
      ],
      "no-empty-function": "off"
    },
    "settings": {
	    "import/resolver": {
	      "typescript": {}
	    }
	  }
};
