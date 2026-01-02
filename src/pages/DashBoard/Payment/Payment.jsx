import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {

    const {parcelId} = useParams()
    const axiosSecure = useAxiosSecure()
    const {data: parcel, isLoading }= useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    if(isLoading){
        return <div className='w-full mx-auto'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    const handlePayment = async()=>{
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName:parcel.parcelName
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        window.location.href = res.data.url
        console.log(res.data)
    }

    return (
        <div className='justify-center items-center text-center '>
            <h2>Please pay ${parcel.cost} for: {parcel.parcelName}</h2>
            <button onClick={handlePayment} className='btn text-black btn-primary'>Pay</button>
        </div>
    );
};

export default Payment;