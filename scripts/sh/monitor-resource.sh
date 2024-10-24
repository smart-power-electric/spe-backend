#!/bin/bash

BOT_TOKEN="xxxx"
CHAT_ID="xxxx"

$SAMPLE_RATE=5
$SAMPLE_COUNT=12
CPU_THRESHOLD=90
MEM_THRESHOLD=80

send_telegam_message() {
	local message=$1
	curl -s -X POST https://api.telegram.org/bot$BOT_TOKEN/sendMessage -d chat_id=$CHAT_ID -d text="$1" -d parse_mode="HTML"
}

check_system_utilization(){
	sar -u -r $SAMPLE_RATE $SAMPLE_COUNT > /tmp/sar_output.tmp
	
	cpu_util=$(awk '/^Average:.*all/ {print 100-$NF}' /tmp/sar_output.tmp | tail -n 1)
	cpu_util=$(printf "%.2f" $cpu_util)
	mem_util=$(awk '/^Average:/{print $5}' /tmp/sar_output.tmp | tail -n 1)

	if(( $(echo "$cpu_util > $CPU_THRESHOLD" | bc -l) )); then
		local message="CPU Utilization is high: $cpu_util%"
		send_telegam_message "$message"
	fi

	if(( $(echo "$mem_util > $MEM_THRESHOLD" | bc -l) )); then
		local message="Memory Utilization is high: $mem_util%"
		send_telegam_message "$message"
	fi

	rm -f /tmp/sar_output.tmp
}

while true; do
	check_system_utilization
done