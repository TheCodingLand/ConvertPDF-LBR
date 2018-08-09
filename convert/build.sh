docker build -t gcr.io/${DEVSHELL_PROJECT_ID}/convert:v4 .
docker push gcr.io/${DEVSHELL_PROJECT_ID}/convert:v4

kubectl apply -f convert-deploy.yaml
