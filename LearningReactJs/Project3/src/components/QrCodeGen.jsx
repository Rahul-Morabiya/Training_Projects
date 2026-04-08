import React from 'react'
import {QRCode } from 'react-qr-code';
import { useState } from 'react';

const QrCodeGen = () => {
    const [qrCode,setQrCode]=useState("");
    const [input,setInput]=useState("");
    function handleGenerateQrCode(){
        setQrCode(input);
        setInput("");
    }

  return (
    <div>
      <h1>Qr Code Generator</h1>
      <div>
        <input type="text" name="qr-code" placeholder='Enter Your value here' onChange={(e)=>setInput(e.target.value)} />
        <button disabled={!input && input.trim()===''} onClick={handleGenerateQrCode}>Generate</button>
      </div>
      <div>
        <QRCode  id="qr-code-value" value={qrCode || ""} size={400} bgColor='#fff'></QRCode >
      </div>
    </div>
  )
}

export default QrCodeGen
