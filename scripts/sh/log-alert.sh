#!/bin/bash

BOT_TOKEN="xxxx"
CHAT_ID="xxxx"

send_telegam_message() {
	local message=$1
	curl -s -X POST https://api.telegram.org/bot$BOT_TOKEN/sendMessage -d chat_id=$CHAT_ID -d text="$1" -d parse_mode="HTML"
}

process_log_line() {
	local line=$1
	if echo "$line" | grep -q "ERROR"; then
		local timestamp = $(echo "$line" | grep -oP 'time=\K[^ ]+')
		local error_msg=$(echo "$line" | grep -oP 'msg=\K[^ ]+')

		local message="Error Alert
Time: $timestamp
Error: $error_msg"

		send_telegam_message "$message"
	fi
}

journalctl -u app.service -f -n 0 | while read -r line; do
	process_log_line "$line"
done