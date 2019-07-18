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

`gradle app:assemble`