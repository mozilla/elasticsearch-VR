import os
import sys
import config
import logging
import json
import requests

sys.path.append(os.path.join(os.path.dirname(__file__), "lib"))
sys.path.append(os.path.join(os.path.dirname(__file__), "utilities"))
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from elasticsearch.exceptions import NotFoundError
from elasticsearch.helpers import bulk, BulkIndexError
from elasticsearch_client import ElasticsearchClient, ElasticsearchBadServer, ElasticsearchInvalidIndex, ElasticsearchException
from utilities.toUTC import toUTC
from query_models import SearchQuery, TermMatch, AggregatedResults, SimpleResults

from flask import (
    Flask,
    redirect,
    render_template,
    request,
    session,
    url_for,
    make_response,
    send_from_directory,
    jsonify
)

# setup the app
app = Flask(__name__)

#logging
logger = logging.getLogger(__name__)
if os.environ.get('LOGGING') == 'True':
    logging.basicConfig(level=logging.INFO)


#config
logger.info("Choosing config")
if os.environ.get('ENVIRONMENT') == 'Production':
    # Only cloudwatch log when app is in production mode.
    #handler = watchtower.CloudWatchLogHandler()
    handler = logging.StreamHandler()
    logger.info("Using production config")
    app.logger.addHandler(handler)
    app.config.from_object(config.ProductionConfig())
else:
    # Only log flask debug in development mode.
    logger.info("Using development config")
    logging.basicConfig(level=logging.DEBUG)
    handler = logging.StreamHandler()
    logging.getLogger("werkzeug").addHandler(handler)
    app.config.from_object(config.DevelopmentConfig())


#connect to ES
esClient = ElasticsearchClient((list('{0}'.format(s) for s in app.config['ES_SERVERS'].split(','))),10)
logger.info(app.config['ES_SERVERS'])

@app.route('/nodes')
def info():
    """Return the JSONified nodes info"""
    return jsonify(
        clusternodes=esClient.es_connection.cat.nodes(h='name')
    )

@app.route('/indices')
def indices():
    """return the indexes in the cluster"""
    return jsonify(
        indices=esClient.get_indices()
    )

@app.route('/')
def main_page():
    """main page"""
    return render_template("main_page.html")


@app.route("/vr/<path:filename>")
def vr_file(filename):
    """serve any file in /vr"""
    return send_from_directory('vr/',
                               filename)

@app.route("/assets/<path:filename>")
def assets_file(filename):
    """serve any file in /assets"""
    return send_from_directory('assets/',
                               filename)

# for local development.
if __name__ == '__main__':
    app.run()
