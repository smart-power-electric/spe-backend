#!/bin/bash

BOT_TOKEN="xxxx"
CHAT_ID="xxxx"

HEALTHCHECKS_URL="https://hc-ping.com/xxxxxx"

SERVICES=("your-app" "error-log-monitor")
send_telegam_message() {
	local message=$1
	curl -s -X POST https://api.telegram.org/bot$BOT_TOKEN/sendMessage -d chat_id=$CHAT_ID -d text="$1" -d parse_mode="HTML"
}

down_services=()
for service in "${SERVICES[@]}"; do
	if ! systemctl is-active --quiet "$service"; then
		down_services+=("$service")
	fi
done

if [ ${#down_services[@]} -ne 0 ]; then
	message="The following services are down: %0A"
	for service in "${down_services[@]}"; do
		message+="- $service%0A"
	done
	send_telegam_message "$message"
fi

curl -fsS -m 10 --retry 5 -o /dev/null "$HEALTHCHECKS_URL"