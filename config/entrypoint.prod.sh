#!/bin/bash

# S3에서 .env-prod 파일 다운로드
aws s3 cp s3://mileque-env-bag/.env /app/.env

# 기존의 CMD 실행
exec "$@"