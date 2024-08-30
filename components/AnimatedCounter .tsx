'use client';
import React from 'react';
import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div>
      {/* <CountUp end={amount} /> */}
      <CountUp
        className='w-full'
        decimal=','
        decimals={2}
        prefix='$'
        end={amount}
        duration={2.75}
      />
    </div>
  );
};

export default AnimatedCounter;
