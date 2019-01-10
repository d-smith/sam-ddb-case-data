# SAM DDB Case Data

Case data, dynamoDB sidecar, SAM framework

## Notes

To figure out the API endpoint, first list your APIs:

```console
aws apigateway get-rest-apis
```

Then, get the deets for your particular API:

```console
aws apigateway get-stages --rest-api-id asrqll225d
```

Now use the info to form the endpoint - `https://{api id}.execute-api.{region}.amazonaws.com/{stage}/start`, e.g. `https://asrqll225d.execute-api.us-east-1.amazonaws.com/Stage/start`

