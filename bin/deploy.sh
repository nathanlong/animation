#!/bin/zsh

source ./bin/utils.sh
source ./bin/clean.sh

timestamp=`date "+%y%m%d"`
e_header "Building site..."
npm run build
e_success "Built!"
e_header "Creating new commit for $timestamp"
cd _site
git add --all
git cm "build $timestamp"
git push
cd ..
e_success "$timestamp"


