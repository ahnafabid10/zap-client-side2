import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure()
    const {data: riders = [], refetch} =useQuery({
        queryKey: ["riders", "pending"],
        queryFn: async()=>{
            const res = await axiosSecure.get("/riders")
            return res.data
        }
    }) 

    const updateRiderStatus = (status,rider )=>{
        const updateInfo = {status: status, email:rider.email}
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Rider has been ${status}` ,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
    }

const handleApproval = (rider) => {
    updateRiderStatus("approved", rider)
}

const handleRejection = (rider) => {
    updateRiderStatus("rejected", rider)
}

    return (
        <div>
            <div className="text-5xl">Riders Pending Approval: {riders.length}</div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>District</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        riders.map((rider, index) => <tr>
        <th>{index +1}</th>
        <td>{rider.name}</td>
        <td>{rider.email}</td>
        <td>{rider.district}</td>
        <td>
            <p className={`${rider.status === 'approved' ? "text-green-800" : "text-red-300"}` }>{rider.status}</p>
        </td>
       
        <td>
        <button onClick={()=>handleApproval(rider)} className='btn'>
            <FaUserCheck />
        </button>
        <button 
        onClick={()=>handleRejection(rider)}
        className='btn'>
            <IoPersonRemoveSharp />
        </button>
        <button className='btn'>
            <FaTrash />
        </button>
        </td>
      </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ApproveRiders;