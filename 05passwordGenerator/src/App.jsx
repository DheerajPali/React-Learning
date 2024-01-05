import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook .. It allows you to provide reference, on which element do you want to work , you can take it as querySelector. 
  const passwordRef = useRef(null)

  //useCallback hook.. it takes (fn,[dependencies]) as argument first it runs function after call and save ui in cache and reflect on dependencies changes without refresh.
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "~!#$%^&*()_+{}[]";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      pass += str.charAt(char);
      console.log(pass);
    }
    setPassword(pass);
    console.log(pass);
    console.log(password);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
//You can decide the range of password , how much do you want to copy. here you'll get first 3 text selected. 
    //passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  }, [password]);
  //useEffect hook , it takes (setup,[dependencies]) as argument and run setup function on document.ready , make changes on dependencies.
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-yellow-400 bg-gray-800">
      <h1 className="text-white text-center my-2"> Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 text-purple-500 font-bold"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900"
          onClick={copyPasswordToClipboard}
          
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            value={length}
            min={6}
            max={20}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length :{length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>

          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Chacacters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
