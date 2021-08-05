import React, { useState, useEffect, useMemo} from 'react'
import {FadeLoader} from 'react-spinners'
import { useTable,useGlobalFilter, useFilters, usePagination } from 'react-table'
import { COLUMNS, FormatLaunchSuccess, formatDate } from './Columns'
import { SelectColumnFilter } from './SelectColumnFilter'
import axios from 'axios'
import './Table.css'
import Modal from 'react-modal'
import './TableModal.css'
import {css} from '@emotion/react'

const loaderCSS = css `
margin-top:180px;
margin-left:auto;

margin-right:auto;

`
Modal.setAppElement('#root')
function Table({ columns, data }) {
/* Modal credentials */

  const [modalInfo, setmodalInfo] = useState([])
  const [show, setshow] = useState(false)
  
  const handleShow = () =>{
    setshow(true)
  }

  const handleClose = () =>{
    setshow(false)
  }

  const clickHandler = (row_data) =>{
  
    setmodalInfo(row_data)
    handleShow()
  }

/* ############################################################################ */
  
/* Modal Function */
const ModalContent = () => {

    return (
    <div>
    <Modal isOpen={show} onRequestClose={handleClose} className='modal'>
    <div className='modal__container'>
    <div className='modal__header'>
    <img 
                    className='__modal__image'
                    src = {modalInfo.links.mission_patch_small} 
                    alt='logo'
                />
    
    <div className='modal__header__details'>
        <strong className='modal__header__text'>{modalInfo.mission_name}</strong>
        <span className='modal__header__line1'>{modalInfo.rocket.rocket_name}</span>

        <div className='svg__container'>
      
          <img className='modal__svg'
          src='https://www.pinclipart.com/picdir/big/71-713438_nasa-logo-font-nasa-black-and-white-clipart.png'
          />
          <img className='modal__svg'
            src='https://cdn.icon-icons.com/icons2/2845/PNG/512/wikipedia_logo_icon_181367.png'
            alt=''
          />
          <img className='modal__svg'
            src='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHg9IjBweCIgeT0iMHB4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjNweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFydGJvYXJkIDY8L3RpdGxlPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSI2Mi41IDUwIDUyLjc1IDU1LjAxIDQzIDYwLjAxIDQzIDUwIDQzIDM5Ljk5IDUyLjc1IDQ0Ljk5IDYyLjUgNTAiPjwvcG9seWdvbj48cmVjdCBjbGFzcz0iY2xzLTEiIHg9IjE3LjUiIHk9IjI3LjUiIHdpZHRoPSI2NSIgaGVpZ2h0PSI0NSIgcng9IjExIiByeT0iMTEiPjwvcmVjdD48L3N2Zz4='
            alt=''
          />
        </div>
        
        
    </div>
    <span className={`modal__${FormatLaunchSuccess(modalInfo.launch_success)}`}>{FormatLaunchSuccess(modalInfo.launch_success)}</span>
    </div>
    <div className='modal__info__details'>
        <p className='paragraph'>
            {modalInfo.details}
            <a className='wikki' href={modalInfo.links.wikipedia}>Wikkipedia</a>
        </p>
        
    </div>
    
    <div className='maodal__table'>
    <table className='table'>
        <tbody>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Flight Number
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.flight_number}
                </td>
            </tr>
    
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Mission Name
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.mission_name}
                </td>
            </tr>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Rocket Type
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.rocket.rocket_type}
                </td>
            </tr>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Rocket Name
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.rocket.rocket_name}
                </td>
            </tr>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Manufacturer
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.rocket.second_stage.payloads[0].manufacturer}
                </td>
            </tr>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Nationality
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.rocket.second_stage.payloads[0].nationality}
                </td>
            </tr>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Launch Date
                </td>
                <td className='modal__table__line__value2'>
                    {formatDate(modalInfo.launch_date_utc)}
                </td>
            </tr>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Payload Type
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.rocket.second_stage.payloads[0].payload_type}
                </td>
            </tr>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Orbit
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.rocket.second_stage.payloads[0].orbit}
                </td>
            </tr>
            <tr className='modal__table__line'>
                <td className='modal__table__line__value1'>
                    Launch Site
                </td>
                <td className='modal__table__line__value2'>
                    {modalInfo.launch_site.site_name}
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
    </Modal>
    </div>
    )
    }

/* ################################################################################################### */
 

/* Table credentials */

  useEffect( ()=> {
    setPageSize(12)
    console.log('useeffect')
  },[])
  
  
  

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      canPreviousPage,
      canNextPage,
      nextPage,
      previousPage,
      state,
      setGlobalFilter,
      gotoPage,
      setPageSize,
      prepareRow,
    } = useTable( {columns, data}, useFilters,useGlobalFilter, usePagination );
    
  
    const {globalFilter} = state
   
    
    return (
      <>
      {/* Global Filter dropdown list */}

      <SelectColumnFilter filter={globalFilter} setFilter={setGlobalFilter} />

      {/* ######### Table ########## */}

      <table {...getTableProps()} className="table__container">
        <thead className='header__container'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className='row__container'>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={`header__${column.render('Header').replace(/[^a-zA-Z ]/g, "")}`}>
                  {column.render('Header')}
                  
                </th>
              ))}
            </tr>
          ))}
        </thead>
   
        {data.length ? (
          <tbody {...getTableBodyProps()} className='body__container'>
            {page.map((row,idx) => {
            
              prepareRow(row);
              
              
              return (
                
                <tr {...row.getRowProps()} className='row__container1' onClick={()=>clickHandler(row.original)}>
                  
                  {row.cells.map((cell,idx) => {
                  
                    return (
                      
                      <td {...cell.getCellProps()} className={`column__${((row.cells[idx].column.Header.replace(/[^a-zA-Z ]/g, "")!=='Launch Status')?row.cells[idx].column.Header.replace(/[^a-zA-Z ]/g, ""):FormatLaunchSuccess(row.cells[idx].value))}`}>
                        {cell.render('Cell')}
                        
                      </td>
                    );
                  })}
                  
                </tr>
              );
            })}
          </tbody>
        ) : (
          
          <FadeLoader css={loaderCSS} loading className='loader'/>
        )}

      </table>
      {/* ######## Navigation buttons ######## */}
      <div className='table__navigator'>
        <button className = 'button' onClick = {() =>previousPage()} disable = {!canPreviousPage}> &#12296; </button>
        <button className = 'button' onClick = {() => gotoPage(0)}>1</button>
        <button className = 'button' onClick = {() => gotoPage(1)}>2</button>
        <button className = 'button'>...</button>
        <button className = 'button' onClick = {() => gotoPage(9)}>10</button>
        <button className = 'button' onClick = {() => nextPage()} disable = {!canNextPage}> &#12297; </button>
      </div>
      {show ? <ModalContent />: null}
      </>
    );
  }

  export default function ApiFetch()
  {
    
    const [data,setData] = useState([])
    const columns = useMemo(() => COLUMNS,[] );

    useEffect( () => {
      

      axios
        .get('https://api.spacexdata.com/v3/launches')
        .then(res => {
            console.log(res.data)
            setData(res.data)
                          
        })
        .catch(err => {
            console.log(err)
            
        })
    },[])
    
    return (
      <>
        <Table columns={columns} data={data} />
      </>
    );
  }