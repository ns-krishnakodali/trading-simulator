import logging

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.dtos.auth_dtos import LoginPayload, SignUpPayload
from app.services.auth_service import authenticate_user, register_user

logger = logging.getLogger("auth")

router = APIRouter()


@router.post("/login")
async def login(
    payload: LoginPayload, db: AsyncSession = Depends(get_db)
) -> JSONResponse:
    try:
        logger.info(f"Login attempt for email: {payload.email}")
        access_token = await authenticate_user(payload, db)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "token": access_token,
            },
        )
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error))


@router.post("/sign-up")
async def sign_up(
    payload: SignUpPayload, db: AsyncSession = Depends(get_db)
) -> JSONResponse:
    try:
        logger.info(f"Signing up for email: {payload.email}")
        new_user = await register_user(payload, db)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={
                "email": new_user.email,
            },
        )
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred.",
        )
