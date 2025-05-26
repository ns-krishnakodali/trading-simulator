from pydantic import BaseModel, Field


class LoginPayload(BaseModel):
    email: str
    password: str
    remember_me: bool = Field(alias="rememberMe")


class SignUpPayload(BaseModel):
    name: str
    email: str
    password: str
