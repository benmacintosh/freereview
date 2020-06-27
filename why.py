from flask import Blueprint
from flask import flash
from flask import g
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from werkzeug.exceptions import abort
from flask import Flask

from flask_frozen import Freezer

import json
import random
import re

import os, os.path



# from .auth import login_required
# from .db import get_db
# from .utils import (
#     gen_id, 
#     # get_best_substitutes, 
#     # get_best_associated_stream,
#     get_linked_streams
# )

app=Flask(__name__)


bp = Blueprint("why", __name__)

@bp.route("/")
def index():

    # fetch latest article
    numberArticles = len(os.listdir('templates/articles'))

    return redirect(url_for("why.page",page=str(numberArticles)))

@bp.route("/free.html")
def free():
    # return first article
    return render_template('free.html')

@bp.route("/<page>.html")
def page(page):
	return render_template('articles/'+page+".html")


app.register_blueprint(bp)
app.config.from_pyfile('settings.py')
freezer = Freezer(app,with_static_files=True)



@freezer.register_generator
def page():

	articles = os.listdir('templates/articles')
	# newarticles = ["/templates/articles/"+x for x in articles]
	newarticles = [x+1 for x in range(0,len(articles))]
	# print(newarticles)
	
	for article in newarticles:
		yield 'why.page', {'page' : article}
		# yield {"templates/articles" :article}
		# yield {"index": '/templates/articles/'+article}

if __name__=="__main__":
	app.run(debug=True)