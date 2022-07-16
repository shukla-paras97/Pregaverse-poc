var fs = require("fs");
var AWS = require('aws-sdk');

exports.uploadAwsFile = (file) => {
    let locationUrl, contentType;
    AWS.config.setPromisesDependency();
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const s3 = new AWS.S3();
    var extention = /^.+\.([^.]+)$/.exec(file.originalname);

    var extention = extention == null ? "" : extention[1];
    if (extention != "") {
        extention = extention.toLowerCase();
    }
    if (extention != "doc" && extention != "mp3" && extention!="jpeg" && extention!="png" && extention!="jpg" && extention!="mp4") {
        return false;
    }
    if (extention == "doc" || extention == "pdf") {
        contentType = 'application/'+extention;
    }
    if(extention=="jpeg" || extention=="png" || extention=="jpg"){
        contentType = 'image/'+extention;
    }
    var date = new Date().getTime();
    var params = {
        ContentType: contentType,
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(file.path),
        Key: 'media/' + file.originalname
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (error, data) => {
            if (error) {
                reject()
            }
            if (data) {
                fs.unlinkSync(file.path) // Empty temp folder
                locationUrl = data.Location
                resolve(locationUrl)
            }
        })
    })
}
