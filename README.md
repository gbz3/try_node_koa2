# try_node_koa2

## 環境設定

### Node.jsバージョン指定

```bash
$ nodenv local 14.1.0
$ node -v
v14.1.0
$ npm -v
6.14.5
```

### TypeScript 最小構成

- [最新版TypeScript+webpack 4の環境構築まとめ(React, Vue.js, Three.jsのサンプル付き)](https://ics.media/entry/16329/)

```bash
$ npm init
$ npm install --save-dev typescript ts-loader
$ vi package.json
$ cat package.json
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc -p tsconfig.json"
  },
...
  "devDependencies": {
    "ts-loader": "^7.0.4",
    "typescript": "^3.9.2"
  },
  "private": true
}
```

### tsconfig.json

[tsconfig.jsonの全オプションを理解する（随時追加中）](https://qiita.com/ryokkkke/items/390647a7c26933940470)

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2020",
    "module": "es2020",
    "outDir": "dist"
  }
}
```

### koa導入

```bash
$ npm install --save koa @koa/router
$ npm install --save-dev @types/node @types/koa @types/koa__router
...
```

### ビルド＆実行

- `http://localhost:8080/`で`{}`が出力される

```bash
$ npm run build && npm start

> try_node_koa2@1.0.0 build $HOME/git_repos/try_node_koa2
> tsc -p tsconfig.json


> try_node_koa2@1.0.0 start $HOME/git_repos/try_node_koa2
> node dist/main.js
```
