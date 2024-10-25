#!/bin/zsh
# Run SSH command in the background and capture its output
ssh_output=$(ssh -R 80:localhost:5001 serveo.net)

# Wait for a short period to allow the SSH tunnel to establish
sleep 5

# Extract Serveo URL from the SSH output
serveo_url=$(echo "$ssh_output" | grep -o 'https://[a-zA-Z0-9.-]*\.serveo\.net')

# Export the Serveo URL as an environment variable
export SERVEO_URL="$serveo_url"

echo "Serveo URL: $serveo_url"