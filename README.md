- docker build
```bash
docker build -t dev.local/nestjs-winston-app:latest .
```

- kubectl
```bash
k apply -f instrumentation.yaml
k delete -f nestjs-winston-app.yaml; k apply -f nestjs-winston-app.yaml; watch kubectl -n nestjs-test get all;
```
