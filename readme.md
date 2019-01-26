# SAM DDB Case Data

Case data, dynamoDB sidecar, SAM framework

## Deploy

```console
make
```


## Execute

To figure out the API endpoint, describe the stack and get the endpoint out the output value of apiGatewayInvokeUrl

```console
aws cloudformation describe-stacks --stack-name samddbcase
```
Then start the process via the endpoint:

```console
curl -d '{"metavar":"notfoo"}' -H "Content-Type:application/json"  https://god29cqly6.execute-api.us-east-1.amazonaws.com/Dev/start
```

## SAM Local

You can work with local instances of your SAM lambdas using sam-local. You need to inject the environment variable values into the runtime environment via a json file. Use `sam-env-template.json` as a starting point - edit a copy of the file to reflect your environment and reference it on the command line.  

```console
sam local start-api --env-vars sam-env.json
```

One the container boots you can invoke it via the local endpoint, e.g.

```console
curl -d '{"metavar":"notfoo"}' -H "Content-Tyication/json" http://127.0.0.1:3000/start
```

You might need to provide the `--profile` and `--region` arguments as well depending on the environment you run it from.

For hot reloading, you have to repackage the code via `make package`

## Notes

Add blurb about using npm pack for packaging, link to [this](https://hackernoon.com/package-lambda-functions-the-easy-way-with-npm-e38fc14613ba) blog post.

## Todo

* Can we put the header vals into context via the template body?
* Enable cloud watch logs for the API gateway