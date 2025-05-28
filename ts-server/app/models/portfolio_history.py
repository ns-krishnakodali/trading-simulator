import uuid

from app.core.database import Base

from sqlalchemy import Column, ForeignKey, Integer, TIMESTAMP, func
from sqlalchemy.dialects.postgresql import UUID


class PortfolioHistory(Base):
    __tablename__ = "portfolio_history"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(
        UUID(as_uuid=True), ForeignKey("portfolio.portfolio_id"), nullable=False
    )
    month = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)
    value = Column(Integer, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), server_default=func.now(), nullable=False
    )
