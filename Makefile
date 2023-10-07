.PHONY: all build

all: test build

build:
	deno run -A utils/build.js

test:
	deno test -A utils/test.js

cache:
	deno cache utils/test.js

# make gen cat=computing-network
gen:
	deno run -A utils/gen.js $(cat)