.PHONY: all build

all: test build

build:
	deno run -A utils/build.js

test:
	deno test -A utils/test.js

gen:
	deno run -A utils/gen.js $(cat)