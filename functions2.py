import imp
from pyexpat import features
from flask import render_template, redirect, request, url_for, session, flash
from datetime import datetime, timedelta
from .map_test2 import map_test2

check = {
    'regions': 1,
    'startDate': 1,
    'endDate': 1,
    'feature': 1,
}

# data structure will be used further on for input
#intervals = list(range(31))

# data structure will be used further on for input
rates = {
      0: 'Features',
      1: 'New Cases',
      2: 'New Deaths',
      3: 'Vaccinations',
    }

def map():
    highlights = ''

    # called if function called with POST API
    if request.method == "POST":
        ipt = request.form  # put the data into ipt (easier to call the information later in the code),
        # format: { allstates: all abbreviations, 'feature1': feature1, 'feature2': feature2}

        regions= ipt['region']
        #periodLength = ipt['periodLength']  # variable contains the period length

        start_of_startDate = ipt[
            'start_of_startDate']  # variable contains start of the base interval inputted by the user

        start_of_endDate = ipt[
            'start_of_endDate']  # variable contains start of the target interval inputted by the user

        #interval = ipt['interval']  # variable contains the type of change to view (Big Dip, Spike, etc.)
        feature= int (ipt['feature'])

        start_of_startDate = datetime.strptime(start_of_startDate,
                                               '%Y-%m-%d')  # converts the date to an appropriate format
        #end_of_startDate = start_of_startDate.date() + timedelta(days=int(periodLength) - 1)

        start_of_endDate = datetime.strptime(start_of_endDate,
                                             '%Y-%m-%d')  # converts the date to an appropriate format to be read by the code in map_test.py
       # end_of_endDate = start_of_endDate.date() + timedelta(days=int(periodLength) - 1)

    ##### formatting the 'end_of_startDate' variable to be in appropriate format "%d-%b-%Y"
    #end_of_startDate_strip = str(end_of_startDate).split('-')
    #x = datetime(int(end_of_startDate_strip[0]), int(end_of_startDate_strip[1]), int(end_of_startDate_strip[2]))
    #end_of_startDate = x.strftime("%d-%b-%Y")

    ##### formatting the 'end_of_endDate' variable to be in appropriate format "%d-%b-%Y"
    #end_of_endDate_strip = str(end_of_endDate).split('-')
    #x = datetime(int(end_of_endDate_strip[0]), int(end_of_endDate_strip[1]), int(end_of_endDate_strip[2]))
    #end_of_endDate = x.strftime("%d-%b-%Y")

    ##### formatting the 'start_of_startDate' variable to be in appropriate format "%d-%b-%Y"
    start_of_startDate_strip = str(start_of_startDate.date()).split('-')
    x = datetime(int(start_of_startDate_strip[0]), int(start_of_startDate_strip[1]),
                 int(start_of_startDate_strip[2]))
    start_of_startDate = x.strftime("%d-%b-%y").upper()

    ##### formatting the 'end_of_endDate' variable to be in appropriate format "%d-%b-%Y"
    start_of_endDate_strip = str(start_of_endDate.date()).split('-')
    x = datetime(int(start_of_endDate_strip[0]), int(start_of_endDate_strip[1]), int(start_of_endDate_strip[2]))
    start_of_endDate = x.strftime("%d-%b-%y").upper()

    # store end dates in readable format
    endDates = {
        'start': start_of_startDate,
        'end': start_of_endDate
    }

    gen_map = map_test2(regions, start_of_startDate, start_of_endDate,
                       feature)  # call 'map_test' from map_test.py
    key = gen_map.main()  # generate a map using the inputs
    maphash = gen_map.get_maphash()
    returned_map = maphash[key]
    filepath = "maps/Cases-" + start_of_startDate + "vs" + start_of_endDate + "-intDays" + "/" + returned_map  # get map url

    # load index.html with new url for map
    return {
        'regions':regions,
        'rates': rates,
        'filepath': filepath,
        'highlights': ['highlight', 'lowlight'],
        'ipt': ipt,
        'start': endDates['start'],
        'end': endDates['end'],
        'check': check
    }