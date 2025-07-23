import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppModal from '../components/modal/AppModal';
import { userPasswordUpdate, userProfiledelete, userProfileUpdate } from '../redux/actions/auth';
import { closeLoader, setLoader } from '../redux/app/app';

const ProfileAccountPage = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: "",
        last_name: "",
        first_name: "",
        phone_no: "",
        confirm_password: "",
        password: "",
        old_password: "",
        confirm_password: "",
        state: "", 
        address: ""
        
        
    })

    const navigate  =  useNavigate()
    const {user} = useSelector(state => state.user)

    const handleUserUpdate = () => {
        dispatch(setLoader())

        dispatch(userProfileUpdate(  {user:   {
            email: userInfo.email,
            last_name:userInfo.last_name,
            first_name: userInfo.first_name,
            phone_no: userInfo.phone_number,
            profile_attributes: {
              state: userInfo.state,
              address: userInfo.address
            }
           }
        })).then(result => {
            if(userProfileUpdate.fulfilled.match(result)){
               dispatch( closeLoader())
               toast(result.payload.message, {type: "success"})
            }else{
                dispatch( closeLoader())
                toast(result.payload.message, {type: "error"})


            }


        })
    }

    const handlePasswordUpdate = () => {
        if(userInfo.password.trim() !== userInfo.confirm_password.trim()){
            toast("password mismatch",{ type: "error"})
            return
        }
        dispatch(setLoader())

        dispatch(userPasswordUpdate({
        
           user: {
                old_password: userInfo.old_password,
                confirm_password: userInfo.confirm_password,
                password: userInfo.password,
            }
        })).then(result => {
            if(userPasswordUpdate.fulfilled.match(result)){
                dispatch(closeLoader())
                toast("password updated",{ type: "success"})
            }else{
                dispatch(closeLoader())
                toast(result.payload.message, { type: "error"})


            }
        })
    }

    useEffect(()=> {

        setUserInfo({...user,
          state: user?.profile?.state,
          address: user?.profile?.address})


    },[user])

    console.log("user info",userInfo)


    const handleUserDelete = () => {
        dispatch(setLoader(true))
        dispatch(userProfiledelete()).then(


            result => {
                if(userProfiledelete.fulfilled.match(result)){
                    toast(result.payload.message, { type: "success"})

                    navigate("/auth/login")
                    dispatch(closeLoader())

                }else{
                    dispatch(closeLoader())
                    toast(result.payload.message, { type: "error"})


                }
            }
        )

    }

  return (
    

    <>
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-4 text-black">Account Settings</h1>

      {/* Profile Info */}

      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-normal mb-2">Personal Info</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input value={userInfo?.first_name} name='first_name' onChange={(e)=> setUserInfo( {...userInfo, first_name: e.target.value})} type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input value={userInfo?.last_name} name='last_name' type="text" onChange={(e)=> setUserInfo({...userInfo, last_name: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input value={userInfo?.phone_no} name='phone_number' type="text" onChange={(e)=> setUserInfo({...userInfo,  phone_no: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={userInfo?.email}  name='email' disabled type="email" onChange={(e)=> setUserInfo({...userInfo, email: e.target.value})} className="mt-1 block w-full rounded-md border bg-gray-200 border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input value={userInfo?.state}  name='state' type="text" onChange={(e)=> setUserInfo({...userInfo, state: e.target.value})} className="mt-1 block w-full rounded-md border  border-gray-300 p-2" />
          </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input value={userInfo?.address}  name='address' type="text" onChange={(e)=> setUserInfo({...userInfo, address: e.target.value})} className="mt-1 block w-full rounded-md border  border-gray-300 p-2" />
          </div>
        </div>
        <button onClick={handleUserUpdate} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Info</button>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-normal mb-2">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" value={userInfo?.old_password} onChange={(e)=> setUserInfo({...userInfo, old_password: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" value={userInfo?.password} onChange={(e)=> setUserInfo({...userInfo, password: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" value={userInfo?.confirm_password} onChange={(e)=> setUserInfo({...userInfo, confirm_password: e.target.value})} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
        </div>
        <button onClick={handlePasswordUpdate} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Update Password</button>
      </div>

      {/* Delete Account */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-normal text-red-600 mb-4">Delete Account</h2>
        <p className="text-sm text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button onClick={() => setOpen(prev => !prev)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete My Account</button>
      </div>
    </div>

    <AppModal open={open} onCancel={()=> setOpen(false)}>
      <div className=" rounded-2xl shadow-lg p-6 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Account</h2>
        <p className="text-gray-100 mb-6">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={()=> setOpen(false)}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-500 text-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUserDelete}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>

    </AppModal>
    </>
  );
};

export default ProfileAccountPage;
