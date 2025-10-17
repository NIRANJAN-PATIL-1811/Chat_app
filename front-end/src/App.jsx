import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {

  const myText = useRef();
  const [ initialVal, setVal ] = useState([]);

  let connection;

  useEffect(() => {
    connection = io('http://localhost:3000');
    connection.on('msg-from-server', (data) => {
      console.log(data)
      setVal([...initialVal, data]);
    });
  }, []);

  function send_fun() {
    connection.emit('msg-from-client', myText.current.value);
    console.log(myText.current.value);
  }

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        <div className="h-[90%] w-[50%] rounded-sm border border-b-gray-700 flex-col">
          <div className="h-[90%] w-[100%] bg-amber-100 overflow-y-scroll">
            {
              initialVal.map((item, index) => {
                <div key={index} className="h-[10%] w-[100%]">
                  {item}
                </div>
              })
            }
          </div>

          <div className="h-[10%] w-[100%] bg-emerald-100 flex flex-row gap-2 justify-center items-center ">
            <div className="h-[90%] w-[79%] bg-amber-600">
              <input className="h-[100%] w-[100%] border border-b-blue-950" ref={myText} type="text" />
            </div>

            <div className="h-[90%] w-[19%] bg-green-300 flex justify-center items-center hover: cursor-pointer ">
              <button onClick={send_fun}>Send</button>
            </div>          
          </div>
        </div>
      </div>
    </>
  );
}


export default App;