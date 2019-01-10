# SAM DDB Case Data

Case data, dynamoDB sidecar, SAM framework

## Deploy

```console
make
```


## Execute

To figure out the API endpoint, first list your APIs:

```console
aws apigateway get-rest-apis
```

Then, get the deets for your particular API:

```console
aws apigateway get-stages --rest-api-id asrqll225d
```

Now use the info to form the endpoint - `https://{api id}.execute-api.{region}.amazonaws.com/{stage}/start`, e.g. `https://asrqll225d.execute-api.us-east-1.amazonaws.com/Stage/start`

Then start the process via the endpoint:

```console
curl -d '{"metavar":"notfoo"}' -H "Content-Type:application/json"  https://dvbbe3eh0g.execute-api.us-east-1.amazonaws.com/Stage/start
```

## Notes

Add blurb about using npm pack for packaging, link to [this](https://hackernoon.com/package-lambda-functions-the-easy-way-with-npm-e38fc14613ba) blog post.