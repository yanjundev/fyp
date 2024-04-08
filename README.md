# fitness social media thing for project

required packages:

- pnpm

## set up prisma

make sure you have `DATABASE_URL` set to a mongodb url in `.env` in:

- packages/database
- solutions/central
- solutions/suggest

```
cd packages/database
pnpm prisma generate
pnpm prisma db push
```

## run central app

```
cd solutions/central
pnpm run dev
```

for oauth provider login to work, you need to obtain their respective CLIENT_ID and CLIENT_SECRET tokens.

for google, check out [link](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid). go to google cloud console, APIs and services > Credentials.

- authorised javascript origin: http://localhost:3000
- authorised redirect url: http://localhost:3000/api/auth/callback/google

for github, go to Settings > Developer Settings > OAuth Apps, and create an app:

- homepage url: http://localhost:3000
- callback url: http://localhost:3000/api/auth/callback/github

**NOTE**: make sure there are no trailing '/'s at the end, or it might not work.

## run suggest api

```
cd solutions/suggest
pnpm run dev
```
