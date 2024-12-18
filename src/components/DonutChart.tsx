'use client'

import dynamic from 'next/dynamic'
import { YearEndInfo } from '@/types'
import { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import { formattedCategory } from '@/utils'

interface Props {
  category: YearEndInfo['yourCategories']
}

const DonutChart = ({ category }: Props) => {
  const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

  const categoryList = formattedCategory(category)

  const [state, setState] = useState<{
    series: any[]
    options: ApexOptions
  }>({
    series: Object.values(categoryList),

    options: {
      chart: {
        type: 'donut',
      },
      labels: Object.keys(categoryList),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  })
  return (
    <div>
      <div id="chart">
        <ApexChart
          options={state.options}
          series={state.series}
          labels={state.options.labels}
          type="donut"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  )
}

export default DonutChart
