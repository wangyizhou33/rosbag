import bagpy
from bagpy import bagreader
import pandas as pd

b = bagreader('../demo.bag')

# get the list of topics
print(b.topic_table)

data = b.message_by_topic('/radar/tracks')
print("File saved: {}".format(data))

tracks = pd.read_csv(data)
print(tracks)