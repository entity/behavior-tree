
build: components index.js
	@component-build --dev

components: component.json
	@component-install --dev

clean:
	rm -rf components build

.PHONY: clean
