dev:
	docker-compose -f docker-compose.dev.yml up --build --remove-orphans
prod:
	docker-compose up -V -d --build --remove-orphans --force-recreate 
build:
	docker-compose -f docker-compose.build.yml build --force-rm
	docker image tag app-accounts_app:latest 31081991/aa-app
	docker image tag app-accounts_db:latest 31081991/aa-db
	docker push 31081991/aa-app
	docker push 31081991/aa-db
stop:
	docker-compose down --remove-orphans
db-console:
	docker exec -it db bash
app-console:
	docker exec -it app bash
db-logs:
	docker logs db
app-logs:
	docker logs app