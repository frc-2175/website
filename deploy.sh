#!/bin/bash
cat server/update_site.sh | tr -d '\r' | ssh ubuntu@18.209.10.40 'bash -s'
