#!/usr/bin/env bash

echo "Entrer le texte qui sera associé à ce commit."
read commit

echo "Entrer la branche à déployer."
read branch

git clone -b $branch https://github.com/badjilounes/nestjs.git NestJS || exit 1
git clone -b master https://git.heroku.com/prescriber.git Prescriber || exit 1

cd NestJS
yarn --network-timeout 1000000

cd ../Prescriber
rm -rf ./*
git add *
git commit -am "Retrait du dernier build"

cd ../NestJS
yarn cache clean

yarn prestart:prod

rsync -d -r dist/ ../Prescriber/

cd ../Prescriber
git add *
git commit -am "$commit"
git push origin master

cd ..

rm -rf NestJS Prescriber
