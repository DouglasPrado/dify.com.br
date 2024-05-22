import {
  SQSClient,
  SQSClientConfig,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";
import type { NextRequest } from "next/server";
export const maxDuration = 150;
export const revalidate = 0;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

export async function GET(request: NextRequest) {
  const configObject: SQSClientConfig = {
    region: "us-east-1",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  };
  const sqsClient = new SQSClient(configObject);
  const queueUrl = "https://sqs.us-east-1.amazonaws.com/021681237162/dify-jobs";
  try {
    const command = new SendMessageCommand({
      MessageBody: JSON.stringify({
        url: "Send",
      }),
      QueueUrl: queueUrl,
    });

    return Response.json({
      error: false,
      message: await sqsClient.send(command),
    });
  } catch (error) {
    return Response.json({
      error: true,
      message: error,
    });
  }
}
