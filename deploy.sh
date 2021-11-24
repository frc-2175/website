#!/bin/bash
cat server/update_site.sh | ssh ubuntu@18.209.10.40 "tr -d '\r' | bash -s"
