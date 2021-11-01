import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Grid, MenuItem, TextField, Typography } from '@mui/material'

// third-party
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts'

// project imports
import SkeletonTotalGrowthBarChart from '../../ui-component/cards/Skeleton/TotalGrowthBarChart'
import MainCard from '../../ui-component/cards/MainCard'

// chart data
// import chartData from './chart-data/total-growth-bar-chart'

const status = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'month',
    label: 'This Month',
  },
  {
    value: 'year',
    label: 'This Year',
  },
]

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState(0)
  const [chart, setChart] = useState([])
  const theme = useTheme()
  const customization = useSelector((state) => state.customization)

  const { navType } = customization
  const { primary } = theme.palette.text
  const darkLight = theme.palette.dark
  const grey200 = theme.palette.grey[200]
  const grey500 = theme.palette.grey[500]

  const primary200 = theme.palette.primary[200]
  const primaryDark = theme.palette.primary.dark
  const secondaryMain = theme.palette.secondary.main
  const secondaryLight = theme.palette.secondary.light

  const gridSpacing = 3

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .get('http://kidsio.herokuapp.com/dashboard/chart', {
        headers: headers,
      })
      .then((res) => {
        if (res.data.hasError === false) {
          console.log(res.data)
          setChart(res.data.months)

          let dates = res.data.months

          let amount = 0
          for (let i = 0; i < dates.length; i++) {
            amount += dates[i]
          }
          setValue(amount)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const chartData = {
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      xaxis: {
        type: 'category',
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      fill: {
        type: 'solid',
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
      },
    },
    series: [
      {
        name: 'Amount',
        data: chart,
      },
    ],
  }

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: grey200,
      },
      tooltip: {
        theme: 'light',
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
    }

    // do not load chart when loading
    // if (!isLoading) {
    //   ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData)
    // }
  }, [
    navType,
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    darkLight,
    grey200,
    isLoading,
    grey500,
  ])

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Grid container direction='column' spacing={1}>
                    <Grid item>
                      <Typography variant='subtitle2'>
                        Yearly Expenses
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h4'>&#8358;{value}.00</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  )
}

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
}

export default TotalGrowthBarChart
