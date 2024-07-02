import React, { useEffect, useState } from 'react';

const Chat = ({refreshKey, doRefresh, chatHistory, sendMessage, employeeId, employees}) => {
   let currentEmployee = employees.find(e => e.employeeID == employeeId);
   let fullName = currentEmployee !== undefined ? currentEmployee.firstName + " " + currentEmployee.lastName + " (" + currentEmployee.employeeID + ")" : 'UNKNOWN (*)';
   const [messageToSend, setMessageToSend] = useState('');

   useEffect(
     () =>
       {   
         ;
       }
   , [[chatHistory]]);

  return (      
    <div className="HomeChat">
    <h1>Hello {fullName}</h1>
    <h3>Send your message to your colleagues:</h3> 
    <form onSubmit={(e) => { e.preventDefault(); sendMessage(messageToSend, 'user'); setMessageToSend(''); }}>
      <input id="message" type="text" value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)}/>
      <button>Send</button>
    </form>
    <h2>Messages from your colleagues</h2>
    <div>
      {chatHistory.map((message, index) => (
        <div key={index}>
          At {message.time} {message.name} wrote: {message.text}, type: {message.type}
        </div>
    ))}
    </div>
</div>
    );
};

export default Chat;
