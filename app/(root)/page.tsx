import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';

function Home() {
    const loggedIn = { firstName: 'Paul', lastName: 'Oluyemi', email: "oluola96@gmail.com" };
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
               <HeaderBox 
                  type="greeting"
                  title='Welcome'
                  user={loggedIn?.firstName || 'Guest'}
                  subtext='Access and manage your account transactions efficiently.'/>

                  <TotalBalanceBox 
                       accounts={[]}
                       totalBanks={1}
                       totalCurrentBalance={1250.35}/>
            </header>
        
        {/* RECENT TRANSACTIONS */}
        </div>
      <RightSidebar 
            user={loggedIn}
            transactions={[]}
            banks={[{ currentBalance: 123.50}, { currentBalance: 500.50}]}/>
    </section>
  )
}

export default Home