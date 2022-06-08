# download demo bag from 
https://open-source-webviz-ui.s3.amazonaws.com/demo.bag

# 1 python

bagpy documentation https://jmscslgroup.github.io/bagpy/index.html

### 1.1 Dependency
```bash
$ pip3 install bagpy
```

### 1.2 Command to run
```
$ cd python/
$ python3 bag.py
```
A `demo` folder will be created. Some csv files should be saved within the folder. The console should display some panda frame.

======

# 2. javascript

rosbag module https://github.com/cruise-automation/rosbag.js/

### 2.1 Dependency
```
npm install rosbag
```

### 2.2 Command to run
```
$ node bag.js
```
json object like below will be printed in the console.
```
    {
      status: 3,
      number: 29,
      range: 20,
      rate: -3.130000114440918,
      accel: 0.3499999940395355,
      angle: 0.10000000149011612,
      width: 0,
      late_rate: -1,
      moving: true,
      power: -10,
      absolute_rate: 191.03797912597656
    },
```


