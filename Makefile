.PHONY: all build

all: test build

build:
	deno run -A utils/build.js

test:
	deno test -A utils/test.js

cache:
	deno cache utils/test.js

gen:
	deno run -A utils/gen.js $(cat)

gen-all:
	# make gen cat=defi
	make gen cat=currency
	make gen cat=infrastructure
	make gen cat=wallets
	make gen cat=computing-network
	make gen cat=layer-2
	make gen cat=hardware
	make gen cat=vpn
	make gen cat=did
	make gen cat=dao
	make gen cat=messaging
	make gen cat=browser
	make gen cat=kyc
	make gen cat=rpc
	make gen cat=storage
	make gen cat=dapps
	make gen cat=os
	make gen cat=nft
	make gen cat=alliances
	make gen cat=rd
	make gen cat=node
	make gen cat=mixing-service
	make gen cat=data-management