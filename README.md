# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, we are using Shadcn for UI Library which uses Tailwind behind the scene:

- [@Shadcn-UI](https://ui.shadcn.com/)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- If want to add any folder for absolute import, add the below in `tsconfig.json` and `vite.config.js` :

```js
export default {
  // vite.config.js
  resolve: {
    alias: {
      "@FOLDER_NAME_HERE": path.resolve(__dirname, "PATH_HERE/*"),
    },
  },
}
```

```js
export default {
  // tsconfig.json
  "paths": {
      "@/*": ["PATH/*"],
      "@FOLDER_NAME_HERE/*": ["PATH_HERE/*"],
    },
}
```

- Replace `env-example` to `.env`
- Add your backend route to `.env`
- Run, `npm i`
- Run, `npm run dev`
