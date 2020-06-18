from flask_frozen import Freezer
from why import app

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()