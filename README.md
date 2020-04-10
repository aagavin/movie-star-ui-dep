

[![CircleCI](https://circleci.com/gh/aagavin/movie-star-ui.svg?style=svg)](https://circleci.com/gh/aagavin/movie-star-ui) [![CodeFactor](https://www.codefactor.io/repository/github/aagavin/movie-star-ui/badge)](https://www.codefactor.io/repository/github/aagavin/movie-star-ui)


MOVIE STAR UI
===


# Build instructions

## build project files
`ionic build`

## create android project
_note: this is only needed once_

`npx cap add android`

`npx cap sync`

## Copy build files
`npx cap copy`

## build android `apk`

`cd ./android`

`./gradlew assembleDebug`
