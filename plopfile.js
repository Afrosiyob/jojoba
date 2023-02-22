import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function componentExists(comp, type = "components") {
  const components = fs.readdirSync(path.join(__dirname, `src/${type}`));

  return components.indexOf(comp) >= 0;
}

export default function (plop) {
  plop.setGenerator("component", {
    description: "Add a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should it be called?",
        default: "Button",
        validate: (value) => {
          if (/.+/.test(value)) {
            return componentExists(value, "components")
              ? "A component with this name already exists"
              : true;
          }

          return "The name is required";
        },
      },
    ],
    actions: (data) => {
      return [
        {
          type: "add",
          path: "./src/components/{{properCase name}}/{{properCase name}}.tsx",
          templateFile:
            "./core/generators/templates/components/Component.tsx.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          path: "./src/components/{{properCase name}}/{{properCase name}}.stories.tsx",
          templateFile:
            "./core/generators/templates/components/Component.stories.tsx.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          path: "./src/components/{{properCase name}}/{{properCase name}}.module.scss",
          templateFile:
            "./core/generators/templates/components/Component.module.scss.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          path: "./src/components/{{properCase name}}/index.ts",
          templateFile: "./core/generators/templates/components/index.tsx.hbs",
          abortOnFail: true,
        },
        {
          type: "append",
          path: "./src/components/index.ts",
          templateFile:
            "./core/generators/templates/components/ComponentList.hbs",
          abortOnFail: true,
        },
      ];
    },
  });
}
