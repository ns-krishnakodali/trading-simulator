import logging

from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.auth.password_handler import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.dtos.auth_dtos import LoginPayload, SignUpPayload
from app.models.users import Users

logger = logging.getLogger("auth")


async def authenticate_user(login_payload: LoginPayload, db: AsyncSession) -> str:
    result = await db.execute(select(Users).where(Users.email == login_payload.email))
    user = result.scalars().first()

    if not user:
        raise ValueError("Email not registered, please check the email address.")

    if not verify_password(login_payload.password, user.password_hash):
        raise ValueError("Incorrect credentials, please try again.")

    logging.info(f"Creating access token for: {user.email}")
    return create_access_token({"email": user.email}, login_payload.remember_me)


async def register_user(signup_payload: SignUpPayload, db: AsyncSession) -> Users:
    result = await db.execute(select(Users).where(Users.email == signup_payload.email))
    existing_user = result.scalars().first()

    if existing_user:
        raise ValueError("A user with this email already exists.")

    hashed_password = hash_password(signup_payload.password)
    new_user = Users(
        name=signup_payload.name,
        email=signup_payload.email,
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
