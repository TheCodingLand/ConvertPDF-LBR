docker build -t gcr.io/${DEVSHELL_PROJECT_ID}/convert:v3 .
docker push gcr.io/${DEVSHELL_PROJECT_ID}/convert:v3

kubectl apply -f convert-deploy.yaml
