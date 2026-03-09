#!/bin/bash

for file in *.webp; do
    echo $(basename $file .webp)
done
