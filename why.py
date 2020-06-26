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
    # load most recent article, indexhtml will load the map

    
    return redirect(url_for("why.page",page='1'))
    # return render_template('articles/article_template.html')

@bp.route("/free.html")
def free():
    # return first article
    return render_template('free.html')

@bp.route("/<page>.html")
def page(page):
    return render_template('articles/'+page+".html")



app.register_blueprint(bp)
app.config.from_pyfile('settings.py')
freezer = Freezer(app)

if __name__=="__main__":
	app.run(debug=True)