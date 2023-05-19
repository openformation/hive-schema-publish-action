# GraphQL Hive schema publish

Use this action to publish changes in your schema to GraphQL Hive using the Hive CLI. Goes together well with [openformation/hive-schema-check-action](https://github.com/openformation/hive-schema-check-action).

> :warning: Running `hive schema:publish` (which is what this action does) automatically uses the `--force` flag. This means that breaking changes will be published *no matter what*. Run a [check](https://github.com/openformation/hive-schema-check-action) before using this action.
## Usage
```yaml
on:
  push:
    branches:
      - main

jobs:
  publish_schema:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    name: Publish GraphQL Hive schema
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Publish schema
        uses: openformation/hive-schema-publish-action@v1
        with:
          service-name: products
          service-url: https://products-api.company.com/graphql
          schema-path: schema.graphql
          hive-registry-access-token: ${{ secrets.HIVE_TOKEN }}
```

## Configuration

| Name | Required | Description | Default |
|---|---|---|---|
| `service-name` | *Required* | Name of the service in Hive | None |
| `service-url` | *Required* | URL of the service GraphQL endpoint | None |
| `schema-path` | *Required* | Path to the .graphql schema file within the repository | None |
| `hive-registry-access-token` | *Required* | Hive registry access token. Make sure it has permission to publish schemas. | None |
