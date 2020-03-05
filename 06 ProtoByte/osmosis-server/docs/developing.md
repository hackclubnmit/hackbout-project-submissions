# Developing

## Running

```
docker-compose \
    -f docker/docker-compose.yml \
    -f docker/docker-compose.dev.yml \
    --project-directory . \
    -p osmosis-server-dev \
    up --build
```
Runs the server with automatic reload enabled on http://0.0.0.0:80.

## [Production](production.md)

## Testing

1. Start the container.
    ```
    docker-compose \
        -f docker/docker-compose.yml \ 
        -f docker/docker-compose.test.yml \
        --project-directory . \
        run --rm prototype sh
    ```
1. Test (e.g., `gradle test`) whenever you want. Test reports are saved to `build/reports/tests/test/`.
1. Run `exit` to shut down the environment.