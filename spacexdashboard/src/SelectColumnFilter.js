import React from 'react'
import './SelectColumnFilter.css'



export const FormatLaunchSuccess = (status) => {
  if (status === null) {
      return 'Upcoming Launches'
  } else if (status) {
      return 'Success Launches'
  } else {
      return 'Failed Launches'
  }
}


export const SelectColumnFilter = ({filter,setFilter}) => {
      // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        console.log(options)
        options.add(true)
        options.add(false)
        options.add(null)
        console.log(...options.values())
        return [...options.values()]
      },[])
    
      // Render a multi-select box
      return (
        <div className='filter__container'>
        <svg className='filter__svg' width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0.666656V1.99999H11.3333L8 6.99999V12.6667H4V6.99999L0.666667 1.99999H0V0.666656H12ZM2.26933 1.99999L5.33333 6.59599V11.3333H6.66667V6.59599L9.73067 1.99999H2.26933Z" fill="#4B5563"/>
    </svg>
        <select className='filter__dropdown'
          value={filter}
          onChange={e => {
            setFilter(e.target.value || undefined)
            console.log(e.target.value)
            
          }}
        >
          <option value="">All Launches</option> 
          {options.map((option, i) => (
            
            <option key={i} value={option}>
              
              {FormatLaunchSuccess(option)}
            </option>
          ))}
        </select>
        </div>
      )

}

