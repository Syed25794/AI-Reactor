import { Card, Modal } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setLoadingFalse } from '../context/LoadingReducer/action';
import Lottie from 'react-lottie';
import loadingLootie from './../assets/lotties/loading.json';

const LoadingModal = ({loading}) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setLoadingFalse());
    }
  return (
    <Modal
        open={loading}
        sx={{display:"flex",alignItems: "center",justifyContent: "center"}}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
       <Card elevation={3} sx={{zIndex:9999, display:"flex", alignItems:"center",justifyContent:'center', width:'20%',height:'20%'}}>
            <Lottie 
              options={{
                loop: true, 
                autoplay: true,
                animationData: loadingLootie
              }}
              width={200}
              height={200}
            />
          </Card>
    </Modal>
  )
}

export default LoadingModal
