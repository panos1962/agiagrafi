all:
	@echo "make { status | diff | add | commit | push | pull | git | dbrefresh | test }"

status:
	@git status

diff:
	@git diff

add:
	@git add .

commit:
	@git commit -m "modifications" .; exit 0

push:
	@git push

git:
	@if git commit -m "modifications" .; then git push; else exit 0; fi

pull:
	@git pull

dbrefresh:
	@bash database/dbcreate.sh && bash database/dbload.sh

test:
	bash local/testwww.sh

cleanup:
	@:
