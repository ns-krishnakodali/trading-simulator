import logging

from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.auth.password_handler import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.models.users import Users

logger = logging.getLogger("auth")


async def authenticate_user(user_email: str, password: str, db: AsyncSession) -> str:
    result = await db.execute(select(Users).where(Users.email == user_email))
    user = result.scalars().first()

    if not user:
        raise ValueError("Email not registered. Please check the email address.")

    if not verify_password(password, user.password_hash):
        raise ValueError("Incorrect password. Kindly try again.")

    logging.info(f"Creating access token for: {user.email}")
    return create_access_token({"email": user.email})


async def register_user(
    name: str, user_email: str, password: str, db: AsyncSession
) -> Users:
    result = await db.execute(select(Users).where(Users.email == user_email))
    existing_user = result.scalars().first()

    if existing_user:
        raise ValueError("A user with this email already exists.")

    hashed_password = hash_password(password)
    new_user = Users(
        name=name,
        email=user_email,
        password_hash=hashed_password,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )

    try:
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        logging.info(f"Creating new user: {new_user.email}")
        return new_user
    except Exception as e:
        await db.rollback()
        raise ValueError("Error when processing the request", str(e))
