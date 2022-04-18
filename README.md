# Attendance Management System

A dashboard to manage all the employees along with their attendance.

## Setup Instructions:

#### Using docker (Recommended)

You can use included `docker-compose.yml` to start database and email services. When using docker the `.env` with defaults from `.env.example` should work out of the box.

```
docker compose up -d
```

Above command is tested on Mac. If it doesn't work for you then try `docker-compose up -d`

#### Using Local or Remote DB & Mail Server

Copy `.env.example` to `.env` and update variables accordingly.

### Running Migrations & Seeders

Do note that seeders won't run in production if dev dependencies are not installed & seeder are only for local testing.

Install dependencies.

```shell
npm install
```

Run migrations

```shell
npm run migrate
```

Seed data

```shell
npm run db:seed
```

Start server and open `http://localhost:3000`

```shell
npm run start
```

> More npm run commands can be found in package.json

Use following credentials to login

```
Admin:
username: john@email.com
password: 123456


Employee:
username: jane@email.com
password: 123456
```

### Running Tests

```shell
npm run test
```

## Requirements:

### Admin (Company) User:

- [x] CRUD for employees
- [x] 3 Fields: Employee name, Email (unique), Date of Joining
- [x] On new employee addition, an onboarding mail will be sent to the employee along with the password. Passwords will be auto generated by the system.
- [x] Company user can log in and check daily attendance of all the employees
- [ ] CRUD for admin
- [x] Mail server for testing

### Employees:

- [x] Employees can log in and mark attendance for the day.
- [x] Should not be able to mark attendance for past or future dates.

### Additional Requirements:

- [x] README file for project setup
- [x] Migrations & Seeders
- [ ] SQL file with data for testing

### Technology Stack:

- Node & Express
- MySQL
- Bootstrap
- Vanilla JS
