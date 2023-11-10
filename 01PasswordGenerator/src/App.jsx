import { useCallback, useEffect, useState, useRef } from "react"
import Button from "./components/Button";
import Checkbox from "./components/Checkbox"

function App() {

  const [length, SetLength] = useState(8);
  const [checkboxData, setCheckboxData] = useState([
    {title: "Add Numeric Values:", id:"numbers", state: false},
    {title: "Add Special Characters:", id:"characters", state: false}
  ]);
  const [copied,setCopied] = useState(false);
  const [password, SetPassword] = useState("");

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  //useRef Hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    const selectedOption = checkboxData.filter((checkbox) => checkbox.state);

    selectedOption.forEach((option) => {
      switch (option.id) {
        case "numbers":
          str += "0123456789";
          break;
        case "characters":
          str += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length +1);

      pass += str.charAt(char);
    }
    SetPassword(pass)
  },[length,checkboxData,SetPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    // passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,5);
    window.navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(()=>setCopied(false),1500);
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[checkboxData,length,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-sm mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black bg-gray-600">
        <h1 className="text-black text-2xl text-center my-3">Password Generator</h1>
        <div className="flex flex-col shadow rounded-lg overflow-hidden mb-4">
          <input
          type="text"
          value={password}
          className="outline-none w-full py-12 px-3 bg-transparent text-3xl text-center cursor-pointer"
          placeholder="Password"
          onClick={copyPasswordToClipBoard}
          readOnly
          ref={passwordRef}
          />
          <button
          className="outline-none bg-blue-700 text-white px-3 py-2 rounded-xl shrink-0"
          onClick={copyPasswordToClipBoard}
          >{copied ? "Copied" : "Copy"}</button>
        </div>

        <div className="flex flex-col items-center justify-center text-md">
          <div className="flex w-full px-10 justify-between items-center">
          <label>Password Length:</label>
          <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={8}
            max={18}
            value={length}
            className="cursor-pointer w-16"
            onChange={(e)=>{SetLength(e.target.value)}}
            />
            <label className="relative right-0">{length}</label>
            </div>
          </div>

          <div className="flex w-full flex-col px-10 gap-x-2">
            {checkboxData.map((checkbox, index) => {
              return (
                <Checkbox
                  key={index}
                  title={checkbox.title}
                  id={checkbox.id}
                  customClass={"flex justify-between items-center gap-x-2"}
                  onChange={() => handleCheckboxChange(index)}
                  state={checkbox.state}
                />
              );
            })}
          </div>
        </div>

        <div>
          <Button
          text="Generate Password"
          onClick={()=>passwordGenerator()}
          customClass="bg-blue-700 text-black w-full mt-5 py-3 rounded-lg"
          />
        </div>
      </div>
    </>
  )
}

export default App
