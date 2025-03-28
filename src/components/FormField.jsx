import React from 'react'

const FormField = ({ LableName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor='{name' className='block text-sm font-medium text-slate-900'>
          {LableName}
        </label>
        Prompt
        {isSurpriseMe && (
          <button
            type = "button"
            onClick = {handleSurpriseMe}
            className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
            >
              Surprise Me
            </button>
        )}
      </div>
      <input
        type = {type}
        id = {name}
        name = {name}
        placeholder = {placeholder}
        value = {value}
        onChange = {handleChange}
        required
        className='bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none w-full p-3'
        /> 
    </div>
  )
}

export default FormField
