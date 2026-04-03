if [ $# -eq 0 ]; then
    echo "No argument supply"
    exit 1
fi

printf "%s\n" "$@"
