const index = require('./index');

const authenticateEvent = {
    "typeName": "Query",
    "fieldName": "authenticate",
    "arguments": {
        "urlParams": "?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=id_res&openid.op_endpoint=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Flogin&openid.claimed_id=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198105617749&openid.identity=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198105617749&openid.return_to=http%3A%2F%2Flocalhost%3A3000%2Flogin&openid.response_nonce=2021-01-17T15%3A28%3A32ZwFH%2FK4DuMKxeBA2CtQruHaiI7u8%3D&openid.assoc_handle=1234567890&openid.signed=signed%2Cop_endpoint%2Cclaimed_id%2Cidentity%2Creturn_to%2Cresponse_nonce%2Cassoc_handle&openid.sig=IqHtUyBihc5vX0wFWmpLCMX77hM%3D"
    },
    "identity": null,
    "source": null,
    "request": {
        "headers": {
            "x-forwarded-for": "91.155.124.79, 130.176.131.85",
            "cloudfront-viewer-country": "FI",
            "cloudfront-is-tablet-viewer": "false",
            "pragma": "no-cache",
            "via": "2.0 5ffe5df2b6c8f15be82e79251546b54a.cloudfront.net (CloudFront)",
            "cloudfront-forwarded-proto": "https",
            "origin": "http://localhost:3000",
            "content-length": "744",
            "cache-control": "no-cache",
            "accept-language": "en-US,en;q=0.9,fi;q=0.8,sv;q=0.7",
            "host": "7tdfbsippjc2thlx64wex3r3ui.appsync-api.eu-west-1.amazonaws.com",
            "x-forwarded-proto": "https",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
            "accept": "application/json, text/plain, */*",
            "cloudfront-is-mobile-viewer": "false",
            "cloudfront-is-smarttv-viewer": "false",
            "accept-encoding": "gzip, deflate, br",
            "referer": "http://localhost:3000/",
            "x-api-key": "da2-oakejvyt4rcpbpxtqcw3fzwnqu",
            "content-type": "application/json; charset=UTF-8",
            "sec-fetch-mode": "cors",
            "x-amz-cf-id": "D7L-jh5SQFNrlevnO2s3YJfW1ZbBauWBA9tBHAQNs8f9w4co44F9hA==",
            "x-amzn-trace-id": "Root=1-6004b132-7dd15bcf0a3eede91f45cd2e",
            "sec-fetch-dest": "empty",
            "x-amz-user-agent": "aws-amplify/3.8.8 js",
            "cloudfront-is-desktop-viewer": "true",
            "sec-fetch-site": "cross-site",
            "x-forwarded-port": "443"
        }
    },
    "prev": {
        "result": {}
    }
};

index.handler(authenticateEvent).then((response) => console.log(response));
