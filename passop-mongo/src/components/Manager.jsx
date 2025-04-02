import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineAddBox } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

  const ref = useRef()
  const passwordref = useRef()
  const [form, setForm] = useState({ site: "", username: "", password: "", });
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(JSON.parse(passwords))
    console.log(password)
  }


  useEffect(() => {
    getPasswords()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const showPassword = () => {
    if (ref.current.src.includes("closedeye.svg")) {
      ref.current.src = "eye.svg"
      passwordref.current.type = "text"
    }
    else {
      ref.current.src = "closedeye.svg"
      passwordref.current.type = "password"
    }
  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // If any such id exists in the db, delete it 
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

      // Otherwise clear the form and show toast
      setForm({ site: "", username: "", password: "" })

      toast.success('Password saved successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      if (form.site.length <= 3) {
        toast('Invalid username')
      }
      if (form.username.length <= 3) {
        toast('Username must have atleast 4 characters')
      }
      if (form.password.length <= 7) {
        toast('Password must have atleast 7 characters')
      }
    }
  }
  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))

      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }
    toast.success('Password deleted!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  const editPassword = (id) => {
    setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-300 opacity-20 blur-[100px]"></div></div>

      <div className="p-2 md:p-0 md:mycontainer md:px-20">
        <div className='p-5'>
          <h1 className='text-4xl font-bold text-center'>
            <span className='text-green-500'>&lt;</span>
            <span className='text-slate-800'>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
          </h1>
          <p className='text-center'>Your own password manager</p>
        </div>
        <div className="flex flex-col gap-6 items-center max-w-xl m-auto">
          <input value={form.site} onChange={handleChange} placeholder='Website URL' className='text-slate-800 rounded-full border-2 border-slate-800 p-1 px-4 w-full' type="text" name='site' id='site' />
          <div className="flex flex-col md:flex-row justify-between w-full gap-6">
            <input value={form.username} onChange={handleChange} placeholder='Username' className='text-slate-800 rounded-full w-full border-2 border-slate-800 p-1 px-4' type="text" name='username' id='username' />

            <div className="relative flex items-center">
              <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Password' className='text-slate-800 rounded-full w-full border-2 border-slate-800 p-1 px-4' type="password" name='password' id='password' />
              <span className='absolute right-1 cursor-pointer'><img ref={ref} onClick={showPassword} src="/closedeye.svg" alt="eye" /></span>
            </div>
          </div>
          <button onClick={savePassword} className='flex font-medium w-fit p-2 px-4 gap-1 justify-center items-center bg-green-400 rounded-full text-slate-800 hover:font-bold hover:text-green-100 shadow-lg ring-2 ring-green-600'>
            <MdOutlineAddBox className='size-5' />Save</button>
        </div>
        <div className="passwords ">
          <h1 className='font-bold text-xl py-4 text-slate-800'>Your Passwords</h1>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {passwordArray.length !== 0 &&
            <table class="table-fixed w-full rounded-md overflow-hidden mb-5">
              <thead className='bg-slate-800 text-white'>
                <tr>
                  <th className='text-start py-2 px-2'>Site</th>
                  <th className='text-start py-2 px-1'>Username</th>
                  <th className='text-start py-2 px-1'>Password</th>
                  <th className='py-2 px-1 w-fit'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item) => {
                  return (
                    <tr>
                      <td><div className='py-2 px-2 flex items-center w-full gap-3'><a href={item.site} target='_blank'>{item.site}</a> <FaCopy className='text-slate-800 cursor-pointer size-4 hover:size-5 item-end' onClick={() => { copyText(item.site) }} /></div></td>
                      <td className='border-x-2 border-x-slate-800'><div className='py-2 px-1 flex items-center w-full gap-3'>{item.username} <FaCopy className='text-slate-800 cursor-pointer size-4 hover:size-5 item-end' onClick={() => { copyText(item.username) }} /></div></td>
                      <td className='border-x-2 border-x-slate-800'><div className='py-2 px-1 flex items-center w-full gap-3'>{"*".repeat(item.password.length)} <FaCopy className='text-slate-800 cursor-pointer size-4 hover:size-5 item-end' onClick={() => { copyText(item.password) }} /></div></td>
                      <td className='flex gap-2 justify-center py-2 text-center'>
                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                          <img className="size-5" src="/edit.svg" alt="" />
                        </span>
                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                          <img className='size-5' src="/delete.svg" alt="" />
                        </span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>}
        </div>
      </div>

    </>
  )
}

export default Manager
