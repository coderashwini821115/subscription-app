import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from '../Firebase/firebaseConfig'
const Register = () => {
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(Name, email, Password);
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, Password);
            if (response.user) {
                await response.user.updateProfile({
                    displayName: Name
                })
                const uid = response.user.uid;
                const userRef = firebase.database().ref('users/' + uid);
                await userRef.set({
                    uid: uid,
                    email: email,
                    username: Name
                });
                setName("");
                setEmail("");
                setPassword("");

                await navigate('/');

            }
        } catch (e) {
            alert(e);
            setName("");
            setEmail("");
            setPassword("");

        }
    }
    return (
        <div className='flex items-center w-full mx-auto h-screen diagonal-background'>
            <form onSubmit={handleSubmit} className="grid place-items-center lg:w-5/12 sm:w-9/12 w-11/12 mx-auto bg-white text-[#4f7cff] shadow-2xl rounder-3xl">
                <div className="pt-16 pb-4 text-3xl font-bold capitalize">
                    Register to Services
                </div>
                { /******Name *******/}
                <div className="w-full flex flex-col px-14 py-8">
                    <label>Name</label>
                    <input
                        type='text'
                        className='w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none'
                        required
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {/* ****Email**** */}
                <div className="w-full flex flex-col px-14 pb-8">
                    <label>Email</label>
                    <input
                        type='email'
                        className='w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* ****Password**** */}
                <div className="w-full flex flex-col px-14 pb-8">
                    <label>Password</label>
                    <input
                        type='password'
                        className='w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none'
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="w-full flex justify-between items-center px-14 pb-8 text-[#3d5fc4]">
                    <div>Already have an account?</div>
                    <div>
                        <Link to="/" className='hover:underline'>
                            Login Now
                        </Link>
                    </div>
                </div>
                <div className="mx-auto flex justify-center items-center pt-6 pb-16">
                    <button type='submit' className='bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2'>
                        Register
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Register;
