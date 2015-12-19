import React from 'react';
import scriptLoader from 'react-async-script-loader';

var SleepVisualizer = React.createClass({
  
	componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
	if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
	  if (isScriptLoadSucceed) {
	    this.buildChart();
	  }
	  else this.props.onError()
	}
	},

	componentDidMount () {
	const { isScriptLoaded, isScriptLoadSucceed } = this.props
	if (isScriptLoaded && isScriptLoadSucceed) {
	  this.buildChart();
	}
	},

	buildChart() {
		var chart = AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "theme": "dark",
            "dataDateFormat": "YYYY-MM-DD",
            "dataProvider": [{
                "date": "2013-11-30",
                "value": 104
            }, {
                "date": "2013-12-01",
                "value": 108
            }, {
                "date": "2013-12-02",
                "value": 103
            }, {
                "date": "2013-12-03",
                "value": 105
            }, {
                "date": "2013-12-04",
                "value": 136
            }, {
                "date": "2013-12-05",
                "value": 138
            }, {
                "date": "2013-12-06",
                "value": 113
            }, {
                "date": "2013-12-07",
                "value": 131
            }, {
                "date": "2013-12-08",
                "value": 114
            }, {
                "date": "2013-12-09",
                "value": 124
            }],
            "valueAxes": [{
                "maximum": 140,
                "minimum": 100,
                "axisAlpha": 0,
                "guides": [{
                    "fillAlpha": 0.1,
                    "fillColor": "#CC0000",
                    "lineAlpha": 0,
                    "toValue": 120,
                    "value": 0
                }, {
                    "fillAlpha": 0.1,
                    "fillColor": "#0000cc",
                    "lineAlpha": 0,
                    "toValue": 200,
                    "value": 120
                }]
            }],
            "graphs": [{
                "bullet": "round",
                "dashLength": 4,
                "valueField": "value"
            }],
            "chartCursor": {
                "cursorAlpha": 0,
                "zoomable":false,
                "valueZoomable":true
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true
            },
            "valueScrollbar":{

            }
        });
  },

  render() {
    return (
    	<div>
        	Visualize my sleep!
        	<div id="chartdiv" style={{width: "100%", height: "400px"}}></div>
    	</div>
  	);
  }
});

export default scriptLoader(
  ['/amcharts/amcharts.js','/amcharts/serial.js']
)(SleepVisualizer);
