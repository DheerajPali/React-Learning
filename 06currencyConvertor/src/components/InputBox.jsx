import React,{useId} from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions =[],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className="",
}){
    const amounInputId = useId()

    return(
        <div className={` bg-black p-3 rounded-lg text-sm flex ${className}`}>
            <div className='w-1/2'>
                <label htmlFor={amounInputId}
                className='text-white/40 mb-2 inline-block'>
                    {label}
                </label>
                <input
                    id={amounInputId}
                    className='outline-none w-full bg-transparent py-1.5'
                    type='number'
                    placeholder='Amount'
                    disabled={amountDisable}
                    value={amount}
                    style={{color:'gray'}}
                    //Here we are chechking weather onAmountChange exists or not??
                    onChange={(e)=>onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className='w-1/2 flex flex-wrap justify-end text-right'>
                <p className='text-white/40 mb-2 w-full'>
                Currency Type </p>
                <select
                    className='rounded-lg px-1 py-1 cursor-pointer outline-none'
                    value={selectCurrency}
                    onChange={(e)=> onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency)=>(
                        <option key={currency} 
                        value={currency}>
                        {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox