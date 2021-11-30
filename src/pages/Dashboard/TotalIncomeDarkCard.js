import PropTypes from 'prop-types'

// material-ui
import { styled, useTheme } from '@mui/material/styles'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'

// project imports
import MainCard from '../../ui-component/cards/MainCard'
import TotalIncomeCard from '../../ui-component/cards/Skeleton/TotalIncomeCard'

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import { useEffect, useState } from 'react'
import axios from 'axios'

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}))

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading }) => {
  const theme = useTheme()
  const [order, setOrder] = useState([])

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }

    axios
      .get('http://joyrideapp.herokuapp.com/dashboard/today', {
        headers: headers,
      })
      .then((res) => {
        if (res.data.hasError === false) {
          console.log(res.data)
          setOrder(res.data.long)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems='center' disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant='rounded'
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.primary[800],
                      color: '#fff',
                    }}
                  >
                    <TableChartOutlinedIcon fontSize='inherit' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45,
                  }}
                  primary={
                    <Typography variant='h4' sx={{ color: '#fff' }}>
                      {order}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant='subtitle2'
                      sx={{ color: 'primary.light', mt: 0.25 }}
                    >
                      No of orders made today
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  )
}

TotalIncomeDarkCard.propTypes = {
  isLoading: PropTypes.bool,
}

export default TotalIncomeDarkCard
