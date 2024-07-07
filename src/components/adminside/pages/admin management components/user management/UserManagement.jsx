import React, { useEffect, useState } from 'react'
import styles from './usermanagement.module.css'
import { admin_authentcatedApiClient } from '../../../../../api/axiosconfig'
import { backendurls } from '../../../../../api/backendEndpoints'
import Swal from 'sweetalert2';


function UserManagement() {

 const [users,setUsers]  = useState([])
 const[blckoperation,setBlocking] = useState(false)


//  fetching user data 

    useEffect(()=>{
      
      fetchUsers()

    },[blckoperation])

//  fetch the users from the  backend 
 const fetchUsers = async () =>{
    try{
        const response = await admin_authentcatedApiClient.get(backendurls.usermanagement)
           if (response.data.message === "success"){
            setUsers(response.data.users)
           }

    }
   catch(error)
      {
        console.log(error);
      }     
 }


//  block and unblock user function
const BlockAndUnBlocking = async (user_id,type) =>{

 
    const result = await Swal.fire({
      title: `Are you sure you want to ${type === 'block' ? 'block' : 'unblock'} this user?`,
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    });
    if (result.isConfirmed)
      {
        try{
        const response = await admin_authentcatedApiClient.put(backendurls.usermanagement,{
          headers : {
              "user_id":user_id,
              "type":type
          }
          
         })
         console.log(response.data.message)
         if (response.data.message === "success"){
          setBlocking(!blckoperation)
          Swal.fire({
            title: `${type}ed successfully`,
            icon: 'success',
        });
         }
        }
        catch(error){
          console.log(error)
        }
      }
    

   
  
 
  


   
}


  return (
    <div>
         <div  className={`container ${styles.body}`}>
         <h3>User management</h3>

              <div className="row mt-4">
                      <div className="col-12">
                          <div className="table-table_responsive">
                              <table className="table table-bordered table-striped">
                              <thead>
                                  <tr>
                                      <th>User name</th>
                                      <th>Email</th>
                                      <th>Phone</th>
                                      <th>actions</th>
                                  </tr>
                              </thead>
                              <tbody>
                        {  users.map((user)=>{
                                  return (
                                        <tr>
                                        <td><p>{user.username}</p></td>
                                        <td><p>{user.email}</p></td> 
                                        <td><p>{user.phone}</p></td>
                                        <td>
                                          { !user.is_blocked ? 
                                                (<button onClick={()=>BlockAndUnBlocking(user.id,"block")} className='px-1 px-lg-5 m-2 bg-danger border-0 text-white'>block</button>):
                                                ( <button onClick={()=>BlockAndUnBlocking(user.id,"unblock")}className='px-1 px-lg-5  bg-success border-0 text-white'>unblock</button>)
                                          }

                                        </td>
                                        </tr>
                                       )
                                    })}
                              </tbody>
                              </table>
                          </div>
                      </div>
              </div>
         </div>
    </div>
  )
}

export default UserManagement