import { Button, Input, InputNew } from '@web3uikit/core';
import React, { useState } from 'react';
import useDebounce from "../Hooks/useDebounce";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const Register = ({ contractAddress, abi }) => {
  const [name, setName] = useState();
  const [fundsNeeded, setFundsNeeded] = useState();
  const [studentId, setStudentId] = useState();
  const [incomeCertificate, setIncomeCertificate] = useState();

  const debouncedName = useDebounce(name, 500);
  const debouncedFundsNeeded = useDebounce(Number(fundsNeeded), 500);
  const debouncedStudentId = useDebounce(studentId, 500);
  const debouncedIncomeCertificate = useDebounce(incomeCertificate, 500);
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'registerStudent',
    args: [
      debouncedName,
      debouncedFundsNeeded,
      debouncedStudentId,
      debouncedIncomeCertificate,
    ],
    enabled: Boolean(
      debouncedName &&
        debouncedFundsNeeded &&
        debouncedStudentId &&
        debouncedIncomeCertificate
    ),
  });

  const { write } = useContractWrite(config);

  console.log(write);
  return (
    <>
        <form className='form'>
            <Input
            style={{
                margin: '0.69rem'
            }}
            label="Name"
            name="name"
            onChange={function noRefCheck(e){setName(e.target.value)}}
            type='text'
            validation={{
                required: true
            }}
            />
            <Input
            style={{
                margin: '0.69rem'
            }}
            label="Funds Needed"
            name="fundsNeeded"
            onChange={function noRefCheck(e){setFundsNeeded(e.target.value)}}
            type='number'
            validation={{
                required: true
            }}
            />
            <Input
            style={{
                margin: '0.69rem'
            }}
            label="Student Id"
            name="studentId"
            onChange={function noRefCheck(e){setStudentId(e.target.value)}}
            type='text'
            validation={{
                required: true
            }}
            />
            <Input
            style={{
                margin: '0.69rem'
            }}
            label="Income Certificate"
            name="incomeCertificate"
            onChange={function noRefCheck(e){setIncomeCertificate(e.target.value)}}
            type='text'
            validation={{
                required: true
            }}
            />
            <Button
                style={{
                    margin:'0.6rem',
                }}
                type='submit'
                text='register'
                theme='translucent'
                onClick={
                    (e)=>{
                        e.preventDefault();
                        write?.();
                    }
                }
                disabled={!write}
            />
        </form>
    </>
  );
};

export default Register;
