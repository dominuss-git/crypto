import React, { FC } from 'react'
import { ResponsiveLine } from '@nivo/line'

import './styles.scss'

export type TChart = {
  id: string
  data: Array<{
    x: string | number
    y: string | number
  }>
}

type TChartProps = { data: TChart[]; onClick?: () => void }

export const Chart: FC<TChartProps> = ({ data, ...rest }) => (
  <div className="chart__wrapper">
    <ResponsiveLine
      {...rest}
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'price',
        legendOffset: -50,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      enableGridY={false}
      lineWidth={1}
      pointSize={2}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={1}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableArea={true}
      useMesh={true}
      legends={[]}
    />
  </div>
)
