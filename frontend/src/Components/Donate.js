import { Badge, Button, Hero, Input } from '@web3uikit/core'
import React, { useEffect, useState } from 'react'
import { Roadmap} from '@web3uikit/icons'
import img from '../assets/people-holding-rubber-heart.jpg'

const Donate = ({ ethContractSigner, ethContract }) => {
    const [amount, setAmount] = useState();
    const [needed, setNeeded] =  useState();
    const [received, setReceived] =useState()
    const handleDonate = async () => {
      try {
        await ethContractSigner.donate(
            { value: amount, gasLimit: 3000000}
        );
        console.log('Donation successful');
      } catch (error) {
        console.error('Error donating:', error);
      }
    };
    const handleAllocate = async () => {
        try {
          await ethContractSigner.allocateFunds(
              {gasLimit: 3000000}
          );
          console.log('allocated successful');
        } catch (error) {
          console.error('Error donating:', error);
        }
      };
    const ne = "Needed~" + needed + 'wei';
    const re = "Received~" + received + 'wei';
    async function mm(){
        const need = await ethContract.totalFundsNeeded();
        const receive = await ethContract.totalFundsReceived();
        setNeeded(Number(need));
        setReceived(Number(receive));
        console.log(Number(need), Number(receive));
    }
    useEffect(()=>{
        mm();
    }, [ethContract, amount])
  

    return (
        <>
        <Hero
        align="left"
        backgroundURL={img}
        height="269px"
        rounded="16px"
        textColor="#fff"
        >
            <Badge
            text={ne}
            textVariant="h2" 
            />
            <Badge
            text={re}
            textVariant="h2" 
            />
            <form className='form'>
                <Input
                style={{
                    margin: '0.6rem',
                    color: 'red',
                    fontWeight: 'bold',
                    
                }}
                label={'Amount'}
                type={"number"}
                labelBgColor='white'
                onChange={(e)=>setAmount(e.target.value)}
                />
                <Button
                style={{
                    margin:'0.6rem',
                }}
                icon={<Roadmap />}
                text="Donate"
                theme="primary"
                onClick={handleDonate} 
                />
            </form>
        </Hero>
        <Button
        style={{
            margin:'0.6rem',
        }}
        text="allocate"
        theme="primary"
        onClick={handleAllocate} 
        />
        </>
    );
  };
  
  export default Donate;
  