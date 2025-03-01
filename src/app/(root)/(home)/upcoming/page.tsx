import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex flex-col text-white pl-6 gap-10 size-full'>
      <h1 className='text-3xl font-bold'>
        Upcoming
      </h1>
      <CallList type='upcoming'/>
    </section>
  )
}

export default Upcoming
