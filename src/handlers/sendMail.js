import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "eu-west-1" });

async function sendMail(event, context) {
  const record = event.Records[0];

  console.log("record --> ", record);

  const email = JSON.parse(record.body);

  const { subject, body, recipient } = email;

  const params = {
    Source: "qhoda.contact@gmail.com",
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
  };

  try {
    const res = await ses.sendEmail(params).promise();
    console.log(res);

    return res;
  } catch (e) {
    console.error(e);
  }
}

export const handler = sendMail;
