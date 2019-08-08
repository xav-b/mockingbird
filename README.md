<div align="center">
	<br/>
	<br/>
	<br/>
	<br/>
	<br/>
  <a href="https://github.com/xav-b/mockingbird">
    <img alt="Mockingbird" title="GitPoint" src="./mockingbird.jpeg" width="130">
  </a>
	<br />
	<h2><a href="https://github.com/xav-b/mockingbird">Mockingbird</a></h2>
	<br />
	<br />
	<sup>
	<br />
	<br />
	Fake it until you make it - <a
	target="_blank" href="https://github.com/xav-b/mockingbird/README.md">Docs</a>.
	<br />
	</sup>
	<br />
	<br />
	<br />
</div>

---

[![Build Status](https://travis-ci.org/xav-b/mockingbird.svg?branch=master)](https://travis-ci.org/xav-b/mockingbird)
[![codecov](https://codecov.io/gh/xav-b/mockingbird/branch/master/graph/badge.svg)](https://codecov.io/gh/xav-b/mockingbird)

<br/>
<br/>

## ✨ Highlight

✔️ Declarative API description

✔️ Endpoints as code to fit all use cases

✔️ Generate data - on the fly or beforehand for more control

✔️ Easily switch scenarios to simulate different use cases

✔️ Support swagger to easily share and interact with the API contract

✔️ Emulate complex scenarios:

- request delays
- [todo] authentication

## In a Nutshell

```sh
# all you need is 5min - let's get started
npm install -g @hackliff/mockingbird

mkdir -p nasa/scenarios && cd nasa
```

**Write a scenario**

```
// in ./scenarios/build.js

const success = (req, res) => res.status(204).json({ request_id: Math.random() })

module.exports = { success }
```

**Write some config**

```yaml
title: 'NASA'
storage: 'json'

scenarios:
  - name: healthcheck

endpoints:
  - description: 'build spaceship'
    method: POST
    module: ./scenarios/build
    uri: /v2/spaceships
    scenario: async success
    latency: 4000
```

**Serve a full-featured API**: `mockingbird serve --port 4000`

**Profit**: `curl -X POST -d '{ "engine": "nuclear" }' localhost:4000/v2/spaceships`

## Installation

## Usage

### Configuration

### Scenarios

---

## Workflow

### 🚀 Release

We follow a few industry standards.

- Git flow
- Semantic release
- Release notes are only generated for major releases.

### Local issue tracker

_To be progressively migrated to github issues as we release it open
source_

The project manages todos using
[taskbook](https://github.com/klaussinani/taskbook). After installing
dependencies, source `.env` to update its configuration and use the
local database.

Then use it as indicated on the github readme: `npx tb -i`.

---

<img
  width="50px"
  alt="profile"
  src="https://it.gravatar.com/userimage/51922459/c5e521b1b03eabff18b3763bcdfef8ff.jpeg"
  align="right" />

### 💖 Shameless plug

> Hey nice to meet you, I'm [Xavier](www.xav-b.fr) and I maintain this project.

<a href="https://www.buymeacoffee.com/xavb" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
&nbsp;&nbsp;&nbsp;<a target="_blank"
href="https://tinyletter.com/Xav"><img width="38px" alt="subscribe"
src="https://newvitruvian.com/images/svg-buttons-web-1.png"/></a>

<div align="center">
	<br>
	<br>
	<br>
	<br>
  <sub>Mockingbird - API mocker
	<br/>Built by
  <a href="http://www.xav-b.fr">Xavier Bruhiere</a> and
  <a href="https://github.com/xav-b/mockingbird/graphs/contributors">
    contributors
  </a>
	<br/>with a </i>💻<i> and some </i>🍣
</div>

<p align="center">
	<br>
	<br>
	<img
		src="https://github.com/xav-b/on-a-budget/blob/master/assets/vespa.svg"
		width="48"
		alt="TIC logo" />
	<br>
	<br>
</p>
