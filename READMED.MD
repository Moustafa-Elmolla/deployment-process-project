# Hosting a Full-Stack Application

### **You can use you own project completed in previous courses or use the provided Udagram app for completing this final project.**

# Udagram

# frontend:install : `cd udagram/udagram-frontend && npm install -f`

# api:install : `cd udagram/udagram-api && npm install `

### Dependencies

```
- Node v14.15.1 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

- AWS CLI v2, v1 can work but was not tested for this project

- A RDS database running Postgres.

- A S3 bucket for hosting uploaded pictures.

```

### Installation

1.  `cd starter/udagram-api` to install the node_modules `npm install`.
    After installation is done start the api in dev mode with `npm run dev`.
2.  navigate to the udagram-frontend `cd starter/udagram-frontend` to intall the node_modules `npm install`.
    After installation is done start the api in dev mode with `npm run start`.

3.  Configuring the AWS CLI:
    go to the link
    https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
    and following instructure
    (AWS IAM)
    then create user with admin permissions just for succees in all tested

    4. `npm run build` for build the project in path we need (assume it /www)

       `eb init` for initiate Elastic Beanstalk

       `eb create` for upload the build archive to the Elastic Beanstalk

       `eb deploy` for deploy any future changes

4.  RDS - Create Postgres DB
    go to the link
    https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#
    then Create Database
    then following instructure and as shown in icluded screenshoots

5.  Elastic Beanstalk
    got to the link
    https://us-east-1.console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/environments
    and following instructure and as shown in attached screenshoots

## Built With

- [Angular](https://angular.io/) - Single Page Application Framework
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework

## License

[License](LICENSE.txt)
