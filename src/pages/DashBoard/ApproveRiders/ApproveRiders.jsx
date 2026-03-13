import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure()
    const {data: riders = []} =useQuery({
        queryKey: ["riders", "pending"],
        queryFn: async()=>{
            const res = await axiosSecure.get("/riders")
            return res.data
        }
    }) 

    const handleApproval = id =>{
        const updateInfo = {status: "approved"}
        axiosSecure.patch(`/riders/${id}`, updateInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Rider has been approved",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
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
        <td>{rider.status}</td>
       
        <td>
        <button onClick={()=>handleApproval(rider._id)} className='btn'>
            <FaUserCheck />
        </button>
        <button className='btn'>
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