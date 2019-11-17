#!/usr/bin/env bash

echo "Entrer le texte qui sera associé à ce commit."
read commit

echo "Entrer la branche à déployer."
read branch

git clone -b $branch https://github.com/badjilounes/nestjs.git NestJS || exit 1
git clone -b master https://git.heroku.com/prescriber.git Prescriber || exit 1

cd NestJS
rsync -d -r ./ ../Prescriber/

cd ../Prescriber
git checkout master
git add .
git commit -am "$commit"
git push origin master

cd ..
rm -rf NestJS Prescriber
