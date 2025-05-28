import uuid

from app.core.database import Base

from sqlalchemy import Column, ForeignKey, Integer, TIMESTAMP, func
from sqlalchemy.dialects.postgresql import UUID


class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(
        UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4
    )
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    starting_capital = Column(Integer, nullable=False)
    portfolio_value = Column(Integer, nullable=False)
    available_capital = Column(Integer, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now(), nullable=False)
