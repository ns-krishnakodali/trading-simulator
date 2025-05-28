import logging.config

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "default",
        },
        "null": {
            "class": "logging.NullHandler",
        },
    },
    "root": {
        "level": "INFO",
        "handlers": ["console"],
    },
    "loggers": {
        "sqlalchemy": {
            "handlers": ["null"],
            "level": "CRITICAL",
            "propagate": False,
        },
        "sqlalchemy.engine": {
            "handlers": ["null"],
            "level": "CRITICAL",
            "propagate": False,
        },
        "sqlalchemy.pool": {
            "handlers": ["null"],
            "level": "CRITICAL",
            "propagate": False,
        },
        "sqlalchemy.dialects": {
            "handlers": ["null"],
            "level": "CRITICAL",
            "propagate": False,
        },
    },
}


def setup_logging():
    logging.config.dictConfig(LOGGING_CONFIG)
