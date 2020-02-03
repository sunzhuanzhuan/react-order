/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-01-15 10:14:33
 * @LastEditors  : wangxinyue
 * @LastEditTime : 2020-02-03 09:24:35
 */
import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import { Empty } from "antd";

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
      <div style={{ background: '#fcfcfc', height: 400, width: '100%' }}>
        {data.length > 0 ? <Chart height={400} data={data} scale={cols} forceFit padding={[60, 80]}>
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
        </Chart> : <Empty style={{ paddingTop: 120, }} />}

      </div>
    );
  }
}
export default Gradient
