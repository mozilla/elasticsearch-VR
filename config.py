#!/usr/bin/python
"""Configuration loader"""

import os
import logging

logger = logging.getLogger(__name__)

class Config(object):
    """Defaults"""
    logger.setLevel(logging.INFO)
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'secretkey'
    SERVER_NAME = os.environ['SERVER_NAME']
    PERMANENT_SESSION = os.environ['PERMANENT_SESSION']
    PERMANENT_SESSION_LIFETIME = int(os.environ['PERMANENT_SESSION_LIFETIME'])
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = False
    LOGGER_NAME = "elastic-VR"


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = False
    logger.setLevel(logging.DEBUG)


class TestingConfig(Config):
    TESTING = True
