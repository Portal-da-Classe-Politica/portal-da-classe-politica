# Portal ReDem

## Getting Started

1. `npm install`
2. `npm run prepare`
3. `npm run dev`

## ReDem API

- `api-docs-original.yml`
  - Latest version of the Open Api Spec for ReDem API. Retrieved on Backend Repo.
- `api-docs.yml`
  - File used to generate the API used on the frontend.
  - Many modifications were applied as the one provide on the backend is long out of date.
  - Modifications were made based on notes provided on meetings.

## Useful Links

- [Figma](https://www.figma.com/design/0bqBQXwZ9pG4J2XZk6ag0U/Plataforma-ReDem?node-id=0-1&t=c0VsGSvQibnbAu79-0)
- [GitHub](https://github.com/Portal-da-Classe-Politica/portal-da-classse-politica)
- [GitHub - Backend](https://github.com/Portal-da-Classe-Politica/portal-da-classe-back/tree/main)
- [Backend Host](https://portal-da-classe-back.onrender.com)
- [GeoJson](https://github.com/tbrugz/geodata-br?tab=readme-ov-file)
- [GeoJson - BR](https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json)

## Generate API

- Update API at `./src/services/redem`
- Run script from `cd scripts && ./generate-redem-api.sh`
