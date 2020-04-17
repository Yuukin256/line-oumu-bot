# line-oumu-bot

AWS Lambda 上で運用する LINE Bot

オウム返しするだけ

```shell
$ npm install
$ npm run compile
```

→ 生成された `index.js` を AWS Lammda で使う

AWS Lambda の環境変数は

- `CHANNEL_ACCESS_TOKEN` に LINE のチャンネルアクセストークン
- `CHANNEL_SECRET` に LINE のチャンネルシークレット

Lambda 上の node_modules は、`@line/bot-sdk` と `@types/aws-lambda` だけあれば動く
