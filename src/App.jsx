import { useState, useEffect} from 'react'


function App() {
const [length, setLength] = useState(6);
const [numberAllowed, setNumberAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState('');
const [buttonState, setButtonState] = useState({
  buttonText: 'Copy',
  buttonBg: 'bg-blue-700 hover:bg-blue-800 '
});

const generatePassword = () => {
  const numbers = '1234567890';
  const characters = '!@#$%^&*';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if (numberAllowed) str+=numbers;
  if (charAllowed) str+=characters;
  let pass = '';

  for(let i = 0; i < length ; i++){
    const index=Math.floor(Math.random() * str.length + 1);
    pass+=str.charAt(index);
  }
  setPassword(pass);
}
useEffect(()=>{
  generatePassword();
  setButtonState({
  buttonText: 'Copy',
  buttonBg: 'bg-blue-700 hover:bg-blue-800'
})
},[length,numberAllowed,charAllowed]);

const handleCopy = (e) => {
  window.navigator.clipboard.writeText(password)
 setButtonState(() =>({
  buttonText:'Copied',
  buttonBg: 'bg-green-700'
 }))
}
console.log(buttonState);

  return (
    <main className='bg-slate-900 h-screen flex justify-center p-4 items-start'>
      <section className='min-w-[400px] bg-slate-700 p-4 text-slate-100 rounded-lg mt-4 flex flex-col justify-center items-center'>
        <h1 className='font-bold text-4xl'>Password Generator</h1>
        <div className='rounded-2xl overflow-hidden mt-4 flex items-center'>
          <input type="text" readOnly value={password} placeholder='Password' className='text-slate-900 font-bold outline-none px-2 py-2 flex-1 text-xl border-none' />
         <button 
         onClick={handleCopy} 
         className={`outline-none text-lg font-bold px-3 py-2 ${buttonState.buttonBg}`}>
  {buttonState.buttonText}
</button>
        </div>
      <label className='flex items-center justify-center gap-4 mt-4 font-bold' htmlFor="length">Length : {length < 10 ? "0"+length : length} <input type="range" min={6} max={20} value={length} onChange={(e)=>setLength(e.target.value)} /></label>
      <label className='flex items-center justify-between w-1/2 gap-4 mt-4 font-bold' htmlFor="length">Numbers <input className='w-[15px] h-[15px]' type="checkbox" value={numberAllowed} onChange={()=>setNumberAllowed(prev => !prev)} /></label>
      <label className='flex items-center justify-between w-1/2 gap-4 mt-4 font-bold' htmlFor="length">Special Characters <input className='w-[15px] h-[15px]' type="checkbox" value={charAllowed} onChange={()=>setCharAllowed(prev => !prev)} /></label>
      <button onClick={generatePassword} className='text-lg font-bold bg-blue-700 px-3 py-2 hover:bg-blue-800 rounded-lg mt-8'>Regenerate</button>
      </section>
    </main>
  )
}

export default App
