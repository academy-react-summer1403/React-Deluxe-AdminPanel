// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import { Users } from 'react-feather'

// ** Custom Components
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const SubscribersGained = ({ Report }) => {
  // ** State
  // const [data, setData] = useState(null)
console.log(Report)

  return (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color='primary'
      stats={69}
      statTitle='Subscribers Gained'
      series={89}
      type='area'
    />
  )
}

export default SubscribersGained
