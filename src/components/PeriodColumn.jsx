import { Box } from '@mui/material'
import React from 'react'
import PeriodBox from './PeriodBox'
import TableHeadBox from './TableHeadBox'
import { columnData } from './../utils/AllGroupData'

const PeriodColumn = () => {
  return (
    <Box sx={{display:"flex",flexDirection:"column", gap:"0.3rem"}}>
      {columnData?.map(boxData => (
        boxData.topValue ? <TableHeadBox key={boxData.id} group={boxData.topValue} period={boxData.bottomValue} /> :
        <PeriodBox key={boxData.id} periodNumber={boxData.periodNumber} />
      ))}
    </Box>
  )
}

export default PeriodColumn
