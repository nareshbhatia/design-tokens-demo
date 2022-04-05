import * as React from 'react';
import { Button, Header } from '../components';

export interface SwatchProps {
  className?: string;
  bgColor: string;
  textColor: string;
  title: string;
  caption: string;
}

const Swatch = ({
  className,
  bgColor,
  textColor,
  title,
  caption,
}: SwatchProps) => {
  return (
    <div className={className}>
      <div className={`swatch ${bgColor}`}>
        <h6 className={`h6xs ${textColor}`}>{title}</h6>
      </div>
      <p className="text-xs line-height-none mt-1">{caption}</p>
    </div>
  );
};

export function DesignSystemPage() {
  return (
    <React.Fragment>
      <Header />
      <div className="p-3">
        <div className="card max-w-800 p-3">
          <h1 className="h1">h1. Heading 1</h1>
          <h2 className="h2 mt-1">h2. Heading 2</h2>
          <h3 className="h3 mt-1">h3. Heading 3</h3>
          <h4 className="h4 mt-1">h4. Heading 4</h4>
          <h5 className="h5 mt-1">h5. Heading 5</h5>
          <h6 className="h6 mt-1">h6. Heading 6</h6>
          <h6 className="h6sm mt-1">h6sm. Heading 6sm</h6>
          <h6 className="h6xs mt-1">h6xs. Heading 6xs</h6>
          <p className="body1 mt-1">
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </p>
          <p className="body2 mt-1">
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </p>
        </div>

        <div className="card max-w-800 p-3 mt-3">
          <h5 className="h5">Text Colors</h5>
          <div className="flex flex-row justify-between mt-2">
            <div className="flex flex-col">
              <h6 className="h6xs">Default Background</h6>
              <Swatch
                className="mt-1"
                bgColor="bg-default"
                textColor="text-primary"
                title="Text Primary"
                caption="semantic.color.text.primary"
              />
              <Swatch
                className="mt-3"
                bgColor="bg-default"
                textColor="text-secondary"
                title="Text Secondary"
                caption="semantic.color.text.secondary"
              />
            </div>
            <div className="flex flex-col">
              <h6 className="h6xs">Primary Background</h6>
              <Swatch
                className="mt-1"
                bgColor="bg-primary-light"
                textColor="text-primary-contrast"
                title="Contrast Text"
                caption="semantic.color.primary.contrastText"
              />
              <Swatch
                className="mt-3"
                bgColor="bg-primary-main"
                textColor="text-primary-contrast"
                title="Contrast Text"
                caption="semantic.color.primary.contrastText"
              />
              <Swatch
                className="mt-3"
                bgColor="bg-primary-dark"
                textColor="text-primary-contrast"
                title="Contrast Text"
                caption="semantic.color.primary.contrastText"
              />
            </div>
            <div className="flex flex-col">
              <h6 className="h6xs">Secondary Background</h6>
              <Swatch
                className="mt-1"
                bgColor="bg-secondary-light"
                textColor="text-secondary-contrast"
                title="Contrast Text"
                caption="semantic.color.secondary.contrastText"
              />
              <Swatch
                className="mt-3"
                bgColor="bg-secondary-main"
                textColor="text-secondary-contrast"
                title="Contrast Text"
                caption="semantic.color.secondary.contrastText"
              />
              <Swatch
                className="mt-3"
                bgColor="bg-secondary-dark"
                textColor="text-secondary-contrast"
                title="Contrast Text"
                caption="semantic.color.secondary.contrastText"
              />
            </div>
          </div>
        </div>

        <div className="card max-w-800 p-3 mt-3">
          <h5 className="h5">Buttons</h5>

          <h6 className="h6 mt-2">Contained Buttons</h6>
          <div className="mt-1">
            <Button>Default</Button>
            <Button rootClass="ml-1" color="primary">
              Primary
            </Button>
            <Button rootClass="ml-1" color="secondary">
              Secondary
            </Button>
            <Button rootClass="ml-1" disabled>
              Disabled
            </Button>
          </div>

          <h6 className="h6 mt-2">Outlined Buttons</h6>
          <div className="mt-1">
            <Button variant="outlined">Default</Button>
            <Button rootClass="ml-1" variant="outlined" color="primary">
              Primary
            </Button>
            <Button rootClass="ml-1" variant="outlined" color="secondary">
              Secondary
            </Button>
            <Button rootClass="ml-1" variant="outlined" disabled>
              Disabled
            </Button>
          </div>

          <h6 className="h6 mt-2">Sizes</h6>
          <div className="mt-1">
            <Button variant="contained" color="primary" size="small">
              Small
            </Button>
            <Button
              rootClass="ml-1"
              variant="contained"
              color="primary"
              size="medium"
            >
              Medium
            </Button>
            <Button
              rootClass="ml-1"
              variant="contained"
              color="primary"
              size="large"
            >
              Large
            </Button>
          </div>
          <div className="mt-2">
            <Button variant="outlined" color="primary" size="small">
              Small
            </Button>
            <Button
              rootClass="ml-1"
              variant="outlined"
              color="primary"
              size="medium"
            >
              Medium
            </Button>
            <Button
              rootClass="ml-1"
              variant="outlined"
              color="primary"
              size="large"
            >
              Large
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
