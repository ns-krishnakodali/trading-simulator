from app.core.database import engine
from app.models import users, portfolio, portfolio_history


async def create_tables():
    async with engine.begin() as connection:
        await connection.run_sync(users.Base.metadata.create_all)
        await connection.run_sync(portfolio.Base.metadata.create_all)
        await connection.run_sync(portfolio_history.Base.metadata.create_all)
