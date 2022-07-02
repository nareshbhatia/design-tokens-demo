# Design Tokens Demo

Sample application to demonstrate a design workflow that keeps design and code
in sync using design tokens.

![Screenshot](assets/screenshot.png)

The Figma file for this project can be found
[here](https://www.figma.com/community/file/1087643130213620036). It is the
source of truth for the design tokens used in this project.

## Development Build

To develop all apps and packages, run the following command:

```
# Install dependencies
npm install

# Generate styles from tokens
npm run token-pipeline

# Run the app
npm run dev
```

Point your browser http://localhost:3000/ to see the running application.

> Note: Do not run `npm install` in any of the subdirectories. It will break the
> build. There should be only one `package-lock.json` file in the entire repo
> (at the root).

## Production Build

To build all apps and packages, run the following command:

```
npm install
npm run token-pipeline
npm run build
```
