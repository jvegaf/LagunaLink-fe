SHELL := $(shell which bash)
IMAGE_NAME := lagunalink/lagunalink_fe
SERVICE_NAME := app

.PHONY: default
default: build

.PHONY: deps
deps:
	@npm install

.PHONY: build
build:
	@npm run build

.PHONY: test
test: 
	@npm run test

.PHONY: start
start: 
	@npm start
