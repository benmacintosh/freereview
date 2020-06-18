from flask import Blueprint
from flask import flash
from flask import g
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from werkzeug.exceptions import abort
from flask import Flask

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
    # return first article
    # redirect(url_for("blog.index"))

    return render_template('index.html')
    # return render_template('articles/article_template.html')

@bp.route("/free")
def free():
    # return first article
    return render_template('free.html')

@bp.route("/<page>")
def page(page):
    return render_template(page+".html")


if __name__=="__main__":
	app.register_blueprint(bp)
	app.run(debug=True)