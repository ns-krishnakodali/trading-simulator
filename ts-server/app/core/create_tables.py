from app.core.database import engine
from app.models import users


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(users.Base.metadata.create_all)
