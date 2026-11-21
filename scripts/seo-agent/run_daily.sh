#!/bin/bash
set -e
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR/../.."
echo "=========================================="
echo "Safar Sathi SEO Growth Agent - Daily Run"
echo "Timestamp: $(date)"
echo "=========================================="
python3 "$DIR/daily_growth_runner.py"
echo "Daily run finished successfully."
