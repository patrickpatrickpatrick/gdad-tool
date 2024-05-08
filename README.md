# Self-Assessment Tool for Government Digital and Data Profession Capability Framework

⚠️⚠️⚠️ This project was developed in a very short time-frame and the code quality will probably reflect that!! ⚠️⚠️⚠️

This React + Vite application was developed for staff self-assessment using the [Government Digital and Data Profession Capability Framework](https://ddat-capability-framework.service.gov.uk/).

The user chooses their discipline and then reviews how well they've performed at the relevant skills by setting a score them and by providing evidence. They can then 'Save' their submission or 'Submit' their submission (which marks it as ready to be reviewed by their line-manager).

The line-manager of the user can then review and approve their self-assessment.

This tool was originally deployed on [Google Apps Script](https://www.google.com/script/start/) and was an integration with a [Google Sheet](https://docs.google.com/spreadsheets/create). The code in the project would handle the loading of data and skills as well as the saving of submissions and line manager validations.

## Running Locally

I have provided an example response and functions for replicating the functionality of the Google Apps Script project locally. The application can be started with 

```
npm run dev
```

## Build Process

The application builds to a single HTML file (using [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile)) with all the Javascript and CSS inline. This was to make the process of integrating the application into Google Apps Script more straightforward. The application can be built with

```
npm run build
```

