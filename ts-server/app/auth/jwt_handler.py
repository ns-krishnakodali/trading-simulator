import jwt
import os

from fastapi import HTTPException, Request, status
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", 30))


def create_access_token(data: dict, remember: Optional[bool] = False) -> str:
    to_encode = data.copy()

    expiration_time = datetime.now(timezone.utc) + timedelta(
        hours=(720 if remember else ACCESS_TOKEN_EXPIRE_HOURS)
    )
    to_encode.update({"exp": int(expiration_time.timestamp())})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_access_token(request: Request) -> dict:
    jwt_token: str | None = request.headers.get("Authorization")
    if not jwt_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
        )

    try:
        payload = jwt.decode(jwt_token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Cannot validate token",
        )
