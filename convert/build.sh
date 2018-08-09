docker build -t gcr.io/${DEVSHELL_PROJECT_ID}/convert:v5 .
docker push gcr.io/${DEVSHELL_PROJECT_ID}/convert:v5

kubectl apply -f convert-deploy.yaml
