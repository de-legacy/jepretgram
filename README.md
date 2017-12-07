# jepretgram
Livecode Phase 2
Demo: http://jepretgram99.s3-website-ap-southeast-1.amazonaws.com/#/

Backup: `http://jepretgram.septianfujianto.com/`

Aplikasi Web mini-instagram dengan fitur upload foto dengan caption, Like foto dan komentar.

# How to Run
Go to server directory:
`npm run dev`

Go to client directory:
`npm run dev`

open : `http://localhost:8080/#/`

# Endpoint:
Api root url : `http://localhost:3000`

## Get all account (GET)
`/api/accounts`

## Get all statuses (GET)
`/api/statuses`

## Delete single status (DELETE)
`/api/statuses/:statusId`


## Give comment (POST)
`/api/statuses/:statusId/comment`

### parameters:

`comment: String`

## Update Status (PUT)
`/api/statuses/:statusId`

### parameters:

`caption: String`

## Like Status (PUT)
`/api/statuses/:statusId/like/:accountId`

## Create Status (POST)
`/api/statuses`

### parameters:

`caption: String`
`image: Image File`
`owner: String Account Id`

## New Account (POST)
`/api/accounts/create`

### parameters:

`username: String`
`password: String`
`email: String Email`

## Sign In (POST)
`/api/signin`

### parameters:

`username: String`
`password: String`

## Update Account (PUT)
`/accounts/update/:accountId`

### parameters:

`username: String`
`password: String`
`email: String Email`

## Update Account (DELETE)
`/accounts/delete/:accountId`