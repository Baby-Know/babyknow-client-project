const { S3 } = require("aws-sdk");
const uuid = require('uuid').v4

// this file is uploading the files passed through from the content.saga
exports.s3Upload = async (files) => {
    const s3 = new S3()

    const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `uploads/${uuid()}-${files.originalname}`,
            Body: files.buffer
    }

    console.log('params', params)

    // awaiting the promise
    return await s3.upload(params).promise();
}
