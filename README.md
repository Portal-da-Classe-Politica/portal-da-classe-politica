# Portal Redem

## Getting Started

1. `npm install`
2. `npm run prepare`
3. `npm run dev`

## Redem API

- `api-docs-original.yml`
  - Latest version of the Open Api Spec for Redem API. Retrieved on Backend Repo.
- `api-docs.yml`
  - File used to generate the API used on the frontend.
  - Many modifications were applied as the one provide on the backend is long out of date.
  - Modifications were made based on notes provided on meetings.

## Useful Links

- [Figma](https://www.figma.com/design/0bqBQXwZ9pG4J2XZk6ag0U/Plataforma-ReDem?node-id=0-1&t=c0VsGSvQibnbAu79-0)
- [GitHub](https://github.com/Portal-da-Classe-Politica/portal-da-classse-politica)
- [GitHub - Backend](https://github.com/Portal-da-Classe-Politica/portal-da-classe-back/tree/main)
- [Backend Host](https://portal-da-classe-back.onrender.com)

## Generate API

- Update API at `./src/services/redem`
- Run script from `cd scripts && ./generate-redem-api.sh`
