import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";

class Gradient extends React.Component {
  render() {
    const { data = [] } = this.props
    const cols = {
      fetchedTime: {
        alias: "时间"
      },
      mediaReadNum: {
        alias: "阅读量"
      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit padding={[60, 80]}>
          <Axis
            name="fetchedTime"
            title={"时间"}
            tickLine={null}
            line={{
              stroke: "#E6E6E6"
            }}
          />
          <Axis
            name="mediaReadNum"
            line={false}
            tickLine={null}
            grid={null}
            title={"阅读量"}
          />
          <Tooltip />
          <Geom
            type="line"
            position="fetchedTime*mediaReadNum"
            size={2}
            shape="smooth"
          />
        </Chart>

      </div>
    );
  }
}
export default Gradient
