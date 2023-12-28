const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Upload } = require("@aws-sdk/lib-storage");
const stream = require("stream");

require("dotenv").config();
const fs = require("fs");

const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: region,
});

function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  const uploader = new Upload({
    client: s3Client,
    params: uploadParams,
  });

  return uploader.done();

  // return s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

//URL CACHING and GETTING NEW URLS
const urlCache = {};

async function getObjectSignedUrl(key) {
  if (urlCache[key] && urlCache[key].expiration > Date.now()) {
    return urlCache[key].url;
  }
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const seconds = 3600;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  urlCache[key] = {
    url: url,
    expiration: Date.now() + seconds * 1000,
  };

  return url;
}

async function updateCSVFile(key, newLine) {
  try {
    const getObjectParams = {
      Bucket: bucketName,
      Key: "mailing-list/mailingList.csv",
    };
    const csvFile = await s3Client.send(new GetObjectCommand(getObjectParams));
    let csvContent = "";
    for await (let chunk of csvFile.Body) {
      csvContent += chunk.toString();
    }
    csvContent += `\n${newLine}`;

    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(csvContent, "utf-8"));

    return uploadFile(bufferStream, key, "text/csv");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  deleteFile,
  getObjectSignedUrl,
  uploadFile,
  updateCSVFile,
};
