docker build -t gcr.io/${DEVSHELL_PROJECT_ID}/convert:v${APPVERSION} .
docker gcr.io/${DEVSHELL_PROJECT_ID}/convert:v${APPVERSION}

kubectl apply -f convert-deploy.yaml
