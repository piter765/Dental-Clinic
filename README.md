Aby uruchomić:
Zainstaluj nodejs i docker(potrzebny jedynie do baz danych i phpmyadmin ktory moze byc hostowany na innym serwerze)
Przejdz w terminalu do katalogu z projektem i wpisz:
npm install
docker-compose up -d          opcjonalne - po tym trzeba zaimportowac baze danych i dodac user sqla ktory moze sie laczyc bez ssla 
npm start

Aby zbudowac aplikacje do contenera aby poszedl na wszystkim: docker build -t twoj_docker_tag/dent .