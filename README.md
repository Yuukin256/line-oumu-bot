# line-oumu-bot

AWS Lambda 上で運用する LINE Bot

オウム返しするだけ

```shell
$ npm install
$ npm run tsc
```

→ 生成された `index.js` を AWS Lambda で使う

AWS Lambda の環境変数は

- `CHANNEL_ACCESS_TOKEN` に LINE のチャンネルアクセストークン
- `CHANNEL_SECRET` に LINE のチャンネルシークレット

Lambda 上の node_modules は、`@line/bot-sdk` と `aws-lambda` だけあれば動く
