#make up env=.env.prod
up:
	docker compose -f ./deployment/docker-compose.yml --env-file ./$(env) up -d
dockerbuild:
	docker build -t spe-backend .
dockerbuilddebug:
	docker build --progress=plain -t spe-backend .