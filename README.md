# elasticsearch-VR
What
-----
Experimental VR interface to elastic search.

When
----
Project for the Mozilla winter break of 2017.

Why
----
VR scenes are fun to interact with, even more fun when they do real things like interface to other systems. This is an experiment
to see if VR can be a useful interface into Elastic Search for discovery, querying, health/status, etc.

Stack
------
- a-frame.io for the webVR portion
- Windows Mixed Reality Headset
- Elastic search (in docker) for a target ES
- Python/flask for the middle/data driving tier.

The idea is that you would use the Mixed Reality headset to enter the scene and trigger basic interactions like:

- Connect to a cluster
- Visualize the cluster size/health
- Select indexes
- Get a visual representation of the index documents/fields
- Use the data dictionary for the index to craft queries
- Visualize the results as aggregations, details, etc.


What works
-----------
Basic VR scene loading.

QuickStart
-----------
Set the environment
```
set -a;source env.example;set +a
```

Start the app
```
python app.py
```

Use a WebVR enabled browser (firefox/IE) to navigate to:
```
http://localhost:5000/
```

Open the VR scene using whatever you have handy for VR, ideally one of
-  Windows Mixed Reality Controller (since that's what it's tested with)



