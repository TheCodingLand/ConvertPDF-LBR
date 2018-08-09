docker build -t gcr.io/${DEVSHELL_PROJECT_ID}/convert:v${APPVERSION} .
docker push gcr.io/${DEVSHELL_PROJECT_ID}/convert:v${APPVERSION}


kubectl apply -f convert-deploy.yaml
