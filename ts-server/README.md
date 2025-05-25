# Trading Simulator Server

Server for a trading portfolio simulator, built using FastAPI and designed to manage trades, portfolios, and analytics with asynchronous database support.

## Server Setup:

Use the following commands to create a Python virtual environment and install the required dependencies:

```bash
# Setup virtual environment
python -m venv venv

# Unix Env
source venv/bin/activate

# Windows
venv\Scripts\activate

# Install the packages
pip install -r requirements.txt
```

---

### Setting Up Environment Variables

**Create a `.env` file and add the following authentication variables. You can refer to `.env.example`.**

```plaintext
SECRET_KEY=SECRET_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=300
```

**Generate a secret key using the following Python code:**

```python
import secrets
print(secrets.token_hex(32))
```

---

### Database Setup:

Run the following SQL commands to create the database and user:

```sql
-- Replace <USER>, <PASSWORD> and <DB> with corresponding values
CREATE USER <USER> WITH PASSWORD '<PASSWORD>';
ALTER ROLE <USER> SET client_encoding TO 'utf8';
ALTER ROLE <USER> SET default_transaction_isolation TO 'read committed';
ALTER ROLE <USER> SET timezone TO 'UTC';
CREATE DATABASE <DB>;
GRANT ALL PRIVILEGES ON DATABASE <DB> TO <USER>;
\c <DB> postgres
GRANT ALL ON SCHEMA public TO <USER>;
```

In the `.env` file, add the database configuration. Refer to `.env.example`.

```plaintext
DATABASE_USER=USER
DATABASE_PASSWORD=PASSWORD
DATABASE_NAME=DB
DATABASE_PORT=5432
DATABASE_HOST=localhost
```

**The required tables will be created automatically on server startup if they do not exist. Make sure your `.env` file is set correctly.**

---

## Start the Server

```bash
# Activate (Unix)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Start the server
uvicorn main:app --reload --port 8000
```

**Note:** Use `python3` or `pip3` if needed.
