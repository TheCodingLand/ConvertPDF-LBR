docker build -t gcr.io/${DEVSHELL_PROJECT_ID}/convert:v6 .
docker push gcr.io/${DEVSHELL_PROJECT_ID}/convert:v6

kubectl apply -f convert-deploy.yaml
