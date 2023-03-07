# angular-spa

.NET 6.0 Angular project generated with [Angular CLI](https://github.com/angular/angular-spa).

[![](https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/angular-spa.png)](http://angular-spa.web-templates.io/)

> Browse [source code](https://github.com/NetCoreTemplates/angular-spa), view live demo [angular-spa.web-templates.io](http://angular-spa.web-templates.io) and install with [dotnet-new](https://docs.servicestack.net/dotnet-new):

    $ dotnet tool install -g x

    $ x new angular-spa ProjectName

Alternatively write new project files directly into an empty repository, using the Directory Name as the ProjectName:

    $ git clone https://github.com/<User>/<ProjectName>.git
    $ cd <ProjectName>
    $ x new angular-spa

## Development workflow

Our recommendation during development is to run the `dev` npm script or Gulp task and leave it running in the background:

    $ npm run dev

This initially generates a full development build of your Web App then stays running in the background to process files as they’re changed. This enables the normal dev workflow of running your ASP.NET Web App, saving changes locally which are then reloaded using ServiceStack’s built-in hot reloading. Alternatively hitting `F5` will refresh the page and view the latest changes.

Each change updates the output dev resources so even if you stop the dev task your Web App remains in a working state that’s viewable when running the ASP.NET Web App.

### Watched .NET Core builds

.NET Core projects can also benefit from Live Coding using dotnet watch which performs a “watched build” where it automatically stops, recompiles and restarts your .NET Core App when it detects source file changes. You can start a watched build from the command-line with:

    $ dotnet watch run

### Create a production build

Run the `build` npm script or gulp task to generate a static production build of your App saved to your .NET App's `/wwwroot` folder:

    $ npm run build

This will let you run the production build of your App that's hosted by your .NET App.

### Updating Server TypeScript DTOs

Run the `dtos` npm script or Gulp task to update your server dtos in `/src/dtos.d.ts`:

    $ npm run dtos

### Deployments

When your App is ready to deploy, run the `publish` npm (or Gulp) script to package your App for deployment:

    $ npm run publish

Which will create a production build of your App which then runs `dotnet publish -c Release` to Publish a Release build of your App in the `/bin/net5/publish` folder which can then copied to remote server or an included in a Docker container to deploy your App.

### Testing

Run the `test` npm script or gulp task to launch the test runner in the interactive watch mode:

    $ npm test

To run end-to-end integration tests with [Protractor](http://www.protractortest.org/):

    $ npm run e2e

## Angular CLI App

This project was generated with [Angular CLI](https://cli.angular.io)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Troubleshooting

### Azure Service Fabric Mesh

If using [Azure Service Fabric Mesh](https://azure.microsoft.com/en-au/services/service-fabric/) you can add the targets to the `.csproj` host project to
have it generate necessary assets on build:

```xml
<Target Name="NgDebug" BeforeTargets="Build" Condition="'$(Configuration)' == 'Debug'">
    <Exec WorkingDirectory="$(ProjectDir)src" Command="ng build -ec" />
</Target>
<Target Name="NgRelease" BeforeTargets="Build" Condition="'$(Configuration)' == 'Release'">
    <Exec WorkingDirectory="$(ProjectDir)src" Command="ng build --prod" />
</Target>
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-spa/blob/master/README.md).
