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
a-frame.io for the webVR portion
Windows Mixed Reality Headset
elastic search (in docker) for a target ES
Python/flask for the middle/data driving tier. 

The idea is that you would use the Mixed Reality headset to enter the scene and trigger basic interactions like: 

- Connect to a cluster
- Visualize the cluster size/health
- Select indexes
- Get a visual representation of the index documents/fields
- Use the data dictionary for the index to craft queries
- Visualize the results as aggregations, details, etc. 


What works
-----------
Nothing! It's a start.


