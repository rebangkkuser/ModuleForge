#!/bin/sh

ARCH=$(uname -m)

echo "detecting python..."

if command -v python3 >/dev/null 2>&1; then
    PYTHON=$(python3 -V 2>&1)
    echo "python already installed: $PYTHON"
else
    echo "python not found, trying to install..."

    if command -v pkg >/dev/null 2>&1; then
        pkg update -y && pkg install python -y

    elif command -v apt >/dev/null 2>&1; then
        sudo apt update && sudo apt install -y python3 python3-pip

    elif command -v pacman >/dev/null 2>&1; then
        sudo pacman -Sy python --noconfirm

    elif command -v dnf >/dev/null 2>&1; then
        sudo dnf install -y python3

    elif command -v apk >/dev/null 2>&1; then
        sudo apk add python3

    else
        echo "no supported package manager found"
        exit 1
    fi

    PYTHON=$(python3 -V 2>&1)
fi

echo "architecture: $ARCH"
echo "python: $PYTHON"

echo "downloading server..."

curl -L -o local.py https://raw.githubusercontent.com/rebangkkuser/ModuleForge/main/py/local.py || exit 1
mkdir data
mkdir mirror
touch data/data.yaml

echo "starting server..."
echo 3
sleep 1
echo 2
sleep 1
echo 1
sleep 1

python3 local.py
