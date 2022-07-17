from email import message
from io import TextIOBase
import os
from subprocess import CalledProcessError
from flask import render_template, request
from cowiz import app
from cowiz.usmap import functions as U
from cowiz.timeline import functions as T
from cowiz.usmap import functions2 as K

from .article import covid_news
from .who import who

@app.route('/')
def index(): 
  # the names of the files in `cowiz/static/timelinedata` are directly used to create
  # the buttons that the user sees on the homepage.
  locales = [ L[:-4] for L in os.listdir('./cowiz/static/timelinedata') if L[0] != 'F' ]

  return render_template("index.html", who = who(), news = covid_news(), locales = locales)

@app.route("/usmap", methods=['GET', 'POST'])
def usmap():
  if request.method == "POST":
    data = U.map()
    return render_template("usmap.html",
      who         = who(),
      intervals   = data['intervals'],
      rates       = data['rates'],
      filepath    = data['filepath'],
      highlights  = data['highlights'],
      ipt         = data['ipt'],
      start       = data['start'],
      end         = data['end'],
      check       = data['check'])

  else:
    # data structure will be used further on for input
    intervals = list(range(0, 31))

    # data structure will be used further on for input
    rates = {
      0: 'Severity Rate',
      1: 'Big Dip',
      2: 'Downtick',
      3: 'Decrease',
      4: 'Flat',
      5: 'Increase',
      6: 'Uptick',
      7: 'Spike',
      8: 'All',
    }
    return render_template("usmap.html",
      who = who(),
      message    = '',
      intervals  = intervals,
      rates      = rates,
      filepath   = '',
      highlights = '',
      ipt        = '',
      start      = '',
      end        = ''
    )

@app.route("/timeline/<locale>")
def timeline(locale):
  return render_template("timeline.html",
    who      = who(),
    locale   = locale,
    death    = T.death(locale),
    regions  = T.load_regions(locale),
    features = T.load_features(locale)
  )

from json import dumps
@app.route("/timeline/results/<locale>", methods=['POST'])
def animate(locale):

  ipt = request.form

  user_regions = [ field for field in ipt if field not in ['feature1', 'feature2'] ]

  features = T.load_features(locale)
  user_f1 = int(ipt['feature1'])
  user_f2 = int(ipt['feature2'])

  return render_template("timeline.html", 
    who      = who(),
    locale   = locale,
    death    = T.death(locale),
    regions  = T.load_regions(locale),
    features = features,
    feature1 = features[user_f1],
    feature2 = features[user_f2],
    data     = dumps(T.get_curves(locale, user_regions, user_f1, user_f2)),
  )

@app.route("/usmap2", methods=['GET','POST'])
def usmap2(): 
  print(request.form)
  if request.method == "POST":
    data = K.map()
    return render_template("usmap2.html",
      who         = who(),
      rates       = data['rates'],
      regions     = data['regions'],
      filepath    = data['filepath'],
      highlights  = data['highlights'],
      ipt         = data['ipt'],
      start       = data['start'],
      end         = data['end'],
      check       = data['check'])
  else:

    regions = {
      0: 'USA',
      1: 'New York',
      2: 'Texas',
      3: 'California',
      4: 'Alabama',
      5:  'Alaska',
      6:  'Arizona',
      7:  'Arkansas',
      8:  'Colorado',
      9:  'Connecticut',
      10:  'Delaware',
      11: 'District of Columbia',
      12: 'Florida',
      13: 'Georgia',
      14:  'Hawaii',
      15: 'Idaho',
      16: 'Illinois',
      17: 'Iowa',
      18: 'Kansas',
      19: 'Kentucky',
      20:  'Louisiana',
      21:  'Maine',
      22:  'Montana',
      23:  'Nebraska',
      24:  'Nevada ',
      25:   'New Hampshire',
      26: 'New Jersey',
      27:  'New Mexico',
      28: 'North Carolina',
      29:  'North Dakota',
      30:   'Ohio',
      31:   'Oklahoma',
      32:   'Oregon',
      33:  'Maryland',
      34:  'Massachusetts',
      35:  'Michigan',
      36:  'Minnesota',
      37:  'Mississippi',
      38:  'Missouri',
      39:   'Pennsylvania',
      40:   'Rhode Island',
      41:   'South Carolina',
      42:  'South Dakota',
      43:   'Tennessee',
      44:    'Texas',
      45:   'Utah',
      46:    'Vermont',
      47:    'Virginia',
      48:   'Washington',
      49:    'West Virginia',
      50:   'Wisconsin',
      51:   'Wyoming'


    }
    rates = {
     0: 'features',
     1: 'New Cases',
     2: 'New Deaths',
     3: 'New Vaccinations',
    }
    return render_template("usmap2.html",
      who = who(),
      message = '',
      regions = regions,
      rates =rates,
      filepath = '',
      highlights = '',
      ipt = '',
      start ='',
      end =''
    )