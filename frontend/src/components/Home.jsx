import React from 'react'
import Alpine from 'alpinejs';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import firebase from '../Firebase/firebaseConfig'
import axios from 'axios';

const Home = () => {
const [userId, setUserId] = useState("");
const [userName, setUserName] = useState("");
const auth = firebase.auth();
  useEffect(() => {

  auth.onAuthStateChanged((user) => {
      if(user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      }
      else {
        setUserId("")
        setUserName("")
      }
    })
  }, [userId]);
  const checkout = async(plan) => {
    const {data: {key}} = await axios.get('http://localhost:8080/api/getkey');
    const {data:{order}} = await axios.post('http://localhost:8080/api/checkout', {
        plan
    });
   const options = {
        key, // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Subscription App", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:8080/api/paymentverification",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
        razor.open();
    // console.log(window);
  }
    window.Alpine = Alpine;
    Alpine.start();
    
  return (
      <div>
        <Link to='/' className='button bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2'>Logout</Link>
      <div class=" mt-10 max-w-sm my-auto mx-auto md:max-w-none grid md:ml-10 md:mr-10 md:grid-cols-4 md:-mx-6 text-sm space-x-4 sm: space-y-4" x-data="{ isAnnual: true }">
    {/* <!-- Column with labels --> */}
    <section class="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
        {/* <!-- Pricing toggle --> */}
        <div class="relative bg-white dark:bg-slate-900 px-6 flex flex-col justify-end space-x-4">
        <h2 className='sub'>Subscribe</h2>
            <div class="pb-5 md:border-b border-slate-200 dark:border-slate-700">
                {/* <!-- Toggle switch --> */}
                <div class="max-md:text-center">
                    <div class="inline-flex items-center whitespace-nowrap">
                        <div class="text-sm text-slate-500 mr-2 md:max-lg:sr-only">Monthly</div>
                        <div class="relative">
                            <input type="checkbox" id="toggle" class="peer sr-only" x-model="isAnnual" />
                            <label for="toggle" class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-indigo-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-indigo-500">
                                <span class="sr-only">Pay Yearly</span>
                            </label>
                        </div>
                        <div class="text-sm text-slate-500 ml-2">Yearly </div>
                    </div>
                </div>
            </div>
        </div>
       
        <div class="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-1" aria-hidden="true">
            <div class="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">Video quality</div>
        </div>
        {/* <!-- Custom Domains --> */}
        <div class="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-2" aria-hidden="true">
            <div class="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">Resolution</div>
        </div>
        {/* <!-- Receipts Forward --> */}
        <div class="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end max-md:hidden md:order-3" aria-hidden="true">
            <div class="py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">Devices you can use to watch</div>
        </div>
      
    </section>
    {/* <!-- End: Column with labels --> */}
    {/* <!-- Essential table --> */}
    <section class="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
        <div class="relative bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end">
            <div class="grow mb-5">
                <div class="font-semibold text-slate-900 dark:text-slate-200 mb-0.5">Basic</div>
                <div class="mb-1">
                    <span class="text-xl font-medium text-slate-900 dark:text-slate-200 inr-sign"></span><span class="text-3xl font-bold text-slate-900 dark:text-slate-200" x-text="isAnnual ? '29' : '35'">29</span><span class="text-slate-500 font-medium">/mo</span>
                </div>
            </div>
            <div class="pb-4 border-b border-slate-200 dark:border-slate-700">
                <button onClick={(e) => checkout('isAnuual'?50: 70)} 
                class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group" href="#0">
                    Get Started <span class="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </button>
            </div>
        </div>
        {/* <!-- # Platform --> */}
        {/* <div class="bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end md:order-1">
            <div class="py-2 text-slate-900 font-medium mt-4 md:sr-only">Video quality</div>
        </div> */}
        {/* <!-- Account Access --> */}
        <div class="bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end md:order-1">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                <svg class="shrink-0 fill-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>Good <span class="md:sr-only">Video quality</span></span>
            </div>
        </div>
        {/* <!-- Custom Domains --> */}
        <div class="bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end md:order-2">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                <svg class="shrink-0 fill-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>360p <span class="md:sr-only">Resolution</span></span>
            </div>
        </div>
        {/* <!-- Receipts Forward --> */}
        <div class="bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end md:order-3">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
               <span class="md:sr-only">Device that you can use to watch are Phone and Tablet</span>
               <span className='respo'>Phone and Tablet</span>
            </div>
        </div>
    
    </section>
  
    <section class="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl dark">
        <div class="relative bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end">
            <div class="absolute top-0 right-0 mr-6 -mt-4">
                <div class="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">Most Popular</div>
            </div>
            <div class="grow mb-5">
                <div class="font-semibold text-slate-900 dark:text-slate-200 mb-0.5">Standard</div>
                <div class="mb-1">
                    <span class="text-xl font-medium text-slate-900 dark:text-slate-200 inr-sign"></span><span class="text-3xl font-bold text-slate-900 dark:text-slate-200" x-text="isAnnual ? '49' : '54'">49</span><span class="text-slate-500 font-medium">/mo</span>
                </div>
            </div>
            

            <div class="pb-4 border-b border-slate-200 dark:border-slate-700">
                <button 
               onClick={(e) => checkout('isAnnual'?49: 54)} 
               value='isAnnual?49: 54' class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group" href="/login">
                    Get Started <span class="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </button>
            </div>
        </div>
        {/* <!-- # Platform --> */}
        {/* <div class="bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end md:order-1">
            <div class="py-2 text-slate-900 font-medium mt-4 md:sr-only">Platform</div>
        </div> */}
        {/* <!-- Account Access --> */}
        <div class="bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end md:order-1">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                <svg class="shrink-0 fill-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>Better <span class="md:sr-only">Video quality</span></span>
            </div>
        </div>
        <div class="bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end md:order-2">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                <svg class="shrink-0 fill-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>720p <span class="md:sr-only">Resolution</span></span>
            </div>
        </div>
        {/* <!-- Custom Domains --> */}
        <div class="bg-white dark:bg-slate-900 px-4 lg:px-6 flex flex-col justify-end md:order-3">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                <span class="md:sr-only">Devices you can use to watch are Phone, Tablet, TV, Laptop</span>
                <span className='md'>Phone, Tablet, Laptop and TV</span>
            </div>
        </div>
       
       
    </section>
    {/* <!-- End: Perform table --> */}
    {/* <!-- Enterprise table --> */}
    <section class="md:contents [&>div:first-child]:pt-10 [&>div:first-child]:rounded-t-2xl [&>div:last-child]:pb-10 [&>div:last-child]:rounded-b-2xl">
        <div class="relative bg-white dark:bg-slate-900 px-6 flex flex-col justify-end">
            <div class="grow mb-5">
                <div class="font-semibold text-slate-900 dark:text-slate-200 mb-0.5">Premium</div>
                <div class="mb-1">
                    <span class="text-xl font-medium text-slate-900 dark:text-slate-200 inr-sign"></span><span class="text-3xl font-bold text-slate-900 dark:text-slate-200" x-text="isAnnual ? '79' : '85'">79</span><span class="text-slate-500 font-medium">/mo</span>
                </div>
            </div>
            
            <div class="pb-4 border-b border-slate-200 dark:border-slate-700">
                <button onClick={(e) => checkout('isAnnual'?79: 85)} 
               value='isAnnual?79: 85' class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group" >
                    Get Started <span class="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </button>
            </div>
        </div>
       
        {/* <!-- Account Access --> */}
        <div class="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-1">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                <svg class="shrink-0 fill-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>Best <span class="md:sr-only">Video quality</span></span>
            </div>
        </div>
        {/* <!-- Custom Domains --> */}
        <div class=" bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-2">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                <svg class="shrink-0 fill-emerald-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                </svg>
                <span>1080p <span class="md:sr-only">Resolution</span></span>
            </div>
        </div>
        {/* <!-- Receipts Forward --> */}
        <div class="bg-white dark:bg-slate-900 px-6 flex flex-col justify-end md:order-3">
            <div class="flex items-center h-full border-b border-slate-200 dark:border-slate-700 py-2 text-slate-600 dark:text-slate-400">
                <span class="md:sr-only">Devices that you can use to watch on are Phone, Tablet, Lapton and TV</span>
                <span className='md'>Phone, Tablet, Laptop and TV</span>
            </div>
        </div>
        
    </section>
    
</div>
     </div>
  )
}

export default Home
