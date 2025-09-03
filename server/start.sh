#!/bin/bash

# Set default port if PORT is not set
if [ -z "$PORT" ]; then
  export PORT=8080
fi

echo "Starting application on port: $PORT"

# Start the Java application
exec java -jar -Dspring.profiles.active=prod target/Server-1.0-SNAPSHOT.jar