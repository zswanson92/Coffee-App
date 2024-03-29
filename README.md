## About
This is a simple app that can create new instances of coffee including the date of their creation and the caffeine content as well as posts regarding specific types of coffee where you can rate them and share your thoughts on them.




## Getting Coffee App started
1. Clone this repository and open the file.

2. Install dependencies

      ```bash
      pipenv install alembic, flask, sqlalchemy, python-dotenv, flask-sqlalchemy, flask-wtf, wtforms, flask-migrate
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

