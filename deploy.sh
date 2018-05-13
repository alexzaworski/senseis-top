export $(cat .env)

yarn run build

rsync -av --delete --exclude {node_modules,.DS_STORE} ./dist/ $PROD_SERVER:$INSTALL_PATH
rsync -v ./package.json $PROD_SERVER:$INSTALL_PATH
rsync -v ./yarn.lock $PROD_SERVER:$INSTALL_PATH

ssh -t $PROD_SERVER "cd $INSTALL_PATH && yarn --prod && pm2 reload all"