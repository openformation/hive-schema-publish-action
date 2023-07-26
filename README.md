# GraphQL Hive Schema Publish Action

Use this action to publish changes in your schema to GraphQL Hive using the Hive CLI. Goes together well with [openformation/hive-schema-check-action](https://github.com/openformation/hive-schema-check-action).

> :warning: Running `hive schema:publish` (which is what this action does) automatically uses the `--force` flag. This means that breaking changes will be published _no matter what_. Run a [check](https://github.com/openformation/hive-schema-check-action) before using this action.

## Usage

```yaml
on:
  push:
    branches:
      - main

jobs:
  publish_schema:
    runs-on: ubuntu-latest
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

| Name                         | Required   | Description                                                                 | Default |
| ---------------------------- | ---------- | --------------------------------------------------------------------------- | ------- |
| `service-name`               | _Required_ | Name of the service in Hive                                                 | None    |
| `service-url`                | _Required_ | URL of the service GraphQL endpoint                                         | None    |
| `schema-path`                | _Required_ | Path to the .graphql schema file within the repository                      | None    |
| `hive-registry-access-token` | _Required_ | Hive registry access token. Make sure it has permission to publish schemas. | None    |
