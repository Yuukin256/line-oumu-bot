import { Client, validateSignature, WebhookEvent, Message } from '@line/bot-sdk';
import { Handler, APIGatewayProxyEvent, Context } from 'aws-lambda';

const client = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
});

export const handler: Handler = async (req: APIGatewayProxyEvent, context: Context) => {
  const body: string = req.body || '';
  const channelSecret: string = process.env.CHANNEL_SECRET || '';
  const signature: string = req.headers['x-line-signature'];
  if (!validateSignature(body, channelSecret, signature)) {
    let res = {
      statusCode: 403,
      body: JSON.stringify({
        result: '署名検証に失敗しました',
      }),
    };
    context.succeed(res);
  } else {
    const events: Array<WebhookEvent> = JSON.parse(body).events;
    await Promise.all(events.map(async (event: WebhookEvent) => handleMessage(event)))
      .catch((err) => console.log(err))
      .then(() => {
        let res = {
          statusCode: 200,
          body: JSON.stringify({
            result: '処理完了',
          }),
        };
        context.succeed(res);
      });
  }
};

async function handleMessage(event: WebhookEvent) {
  console.log(event);
  if (event.type !== 'message') {
    return null;
  }
  let res: Message | Array<Message>;
  switch (event.message.type) {
    case 'text':
      switch (event.message.text) {
        case 'NHKを':
          res = {
            type: 'text',
            text: 'ぶっ壊す！',
          };
          break;
        case '募ってはいるが':
          res = {
            type: 'text',
            text: '募集はしていない',
          };
          break;
        case 'そんなことより':
          res = {
            type: 'text',
            text: 'おうどん食べたい',
          };
          break;
        case 'もこう':
          res = {
            type: 'text',
            text: '(⌒,_ゝ⌒)',
          };
          break;
        case '原辰徳':
          res = {
            type: 'image',
            originalContentUrl: 'https://amd.c.yimg.jp/amd/20200318-03180164-sph-000-3-view.jpg',
            previewImageUrl: 'https://amd.c.yimg.jp/amd/20200318-03180164-sph-000-3-view.jpg',
          };
          break;
        case 'イエス':
        case 'イエス！':
        case 'Yes':
        case 'Yes!':
        case 'yes':
        case 'yes!':
          res = {
            type: 'text',
            text: '高須クリニック',
          };
          break;
        case '死ね':
        case 'しね':
          res = {
            type: 'text',
            text: 'お前が' + event.message.text,
          };
          break;
        default:
          res = {
            type: 'text',
            text: event.message.text,
          };
          break;
      }
      break;
    case 'sticker':
      res = {
        type: 'sticker',
        packageId: event.message.packageId,
        stickerId: event.message.stickerId,
      };
      break;
    case 'image':
      res = new Array(5).fill({
        type: 'image',
        originalContentUrl: 'https://image.itmedia.co.jp/business/articles/1909/05/l_rh_huannkoku01.jpg',
        previewImageUrl: 'https://image.itmedia.co.jp/business/articles/1909/05/l_rh_huannkoku01.jpg',
      });
      break;
    default:
      res = {
        type: 'text',
        text: 'オウムには理解できないよ…',
      };
      break;
  }
  return client.replyMessage(event.replyToken, res);
}
