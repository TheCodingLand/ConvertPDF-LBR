import React from "react";
import 'assets/css/style.css'
import ChartistGraph from "react-chartist";
//Use to render Models lables are versions, series is % of success based on 5% test data
export default class LineChart extends React.Component {
    render() {
var lineChartData = {
  labels: ["v1", "v2", "v3"],
  series: [
    [50, 63, 86,]
  ]
}
var lineChartOptions = {
  low: 0,
  high: 100,
  showArea: true
}
return (
     this.props.data ? <ChartistGraph data={this.props.data} options={lineChartOptions} type={'Line'} /> : 
<ChartistGraph className='.ct-chart' data={lineChartData} options={lineChartOptions} type={'Line'} />
)

}
}
