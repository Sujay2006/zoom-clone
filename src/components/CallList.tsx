'use client'
import { useRouter } from 'next/navigation';
import { useGetCalls } from '../../hooks/useGetCalls'
import { useEffect, useState } from 'react';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import { Description } from '@radix-ui/react-dialog';
import Loader from './Loader';
import Recordings from './../app/(root)/(home)/recordings/page';

const CallList = ({type}:{ type: 'ended'|'upcoming'|'recordings'}) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading,} = useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = ()=>{
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
      return upcomingCalls;    
      default:
        return[]
    }
  }
  const getNoCallsMessage = ()=>{
    switch (type) {
      case 'ended':
        return 'No Previous Call';
      case 'recordings':
        return 'No Recorded Call';
      case 'upcoming':
      return 'No Upcoming Call';    
      default:
        return''
    }
  }

  useEffect(()=>{
    const fetchRecordings = async () => {
      const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if(type === 'recordings') fetchRecordings();
  },[type, callRecordings])

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  console.log(calls);
  
  if(isLoading) return <Loader/>

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length>0 ? calls.map((meeting: Call | CallRecording )=>(
        <MeetingCard 
        key={(meeting as Call)?.id}
        icon={
          type === 'ended'
          ? '/icons/previous.svg'
          :type === 'upcoming'
          ? '/icons/upcoming.svg'
          :'/icons/recordings.svg'
        }
        title={(meeting as Call).state?.custom?.description?.substring(0, 20) || 'No description'}
        date={meeting.state?.startsAt.toLocaleString() || meeting.state?.start_time.toLocaleString()}
        isPreviousMeeting={type === 'ended'}
        buttonIcon1={type === 'recordings'? '/icons/play.svg' : undefined}
        handleClick={type==='recordings' ? ()=> router.push(`${meeting.url}`): ()=> router.push(`/meeting/${meeting.id}`)}
        link={type === 'recordings'? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
        buttonText={type === 'recordings'? 'Play' : 'Start'}
        />
      )):(
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList
