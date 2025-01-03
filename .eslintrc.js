module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",  // React 17 이상 불필요
    "react/no-unescaped-entities": "off",  // HTML 엔터티 오류 무시
    "@typescript-eslint/no-unused-vars": "off",  // 사용하지 않는 변수 무시
    "react/display-name": "off",  // displayName 미지정 오류 무시
    "react/prop-types": "off",  // TypeScript에서는 prop-types 사용하지 않으므로 비활성화
    "@typescript-eslint/no-explicit-any": "off",  // any 타입 허용
    "no-useless-escape": "off",  // 쓸모없는 escape 문자 허용
    "react/no-children-prop": "off"  // children prop 사용 오류 무시
  }
};
