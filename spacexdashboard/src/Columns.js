import './Column.css'
import {SelectColumnFilter} from './SelectColumnFilter'



export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour:'numeric',minute:'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

export const FormatLaunchSuccess = (status) => {
      if (status == null) {
          return 'Upcoming'
      } else if (status) {
          return 'Success'
      } else {
          return 'Failed'
      }
  }

/*  const Tcolumns__No = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
      <>
        {values.map((dataValue, idx) => {
          return (
            <span key={idx} className="No">
              {dataValue}
            </span>
          );
        })}
      </>
    );
  };*/


export const COLUMNS = [
    {
        Header: 'No:',
        accessor:'flight_number',
        Filter: SelectColumnFilter,
        //Filter: FilterTopdown,
        disableFilters: true
        //Cell: ({ cell: { value } }) => <Tcolumns__No values={value} />
    

    },

    {
        Header: 'Launched(UTC)',
        accessor:'launch_date_utc',
        Cell: ({value}) => { return formatDate(value)},
        Filter: SelectColumnFilter,
        //Filter: FilterTopdown,
        disableFilters: true
        //Cell: ({ cell: { value } }) => <Tcolumns__LaunchDate values={value} />
    },

    {
        Header: 'Location',
        accessor:'launch_site.site_name',
        Filter: SelectColumnFilter,
       //Filter: FilterTopdown,
        disableFilters: true
        //Cell: ({ cell: { value } }) => <Tcolumns__Location values={value} />

    },

    {
        Header: 'Mission',
        accessor: 'mission_name',
        Filter: SelectColumnFilter,
        //Filter: FilterTopdown,
        disableFilters: true
        //Cell: ({ cell: { value } }) => <Tcolumns__Mission values={value} />
    
    },

    {
        Header: 'Orbit',
        accessor: 'rocket.second_stage.payloads[0].orbit',
        Filter: SelectColumnFilter,
        //Filter: FilterTopdown,
        disableFilters: true
        //Cell: ({ cell: { value } }) => <Tcolumns__Orbit values={value} />
        
    },

    {
        Header: 'Launch Status',
        accessor: 'launch_success',
        Cell: ({value}) => { return FormatLaunchSuccess(value)},
        Filter: SelectColumnFilter
        //Filter: FilterTopdown,
        //disableFilters: true
        //Cell: ({ cell: { value } }) => <Tcolumns__LaunchStatus values={value} />
        
    },

    {
        Header: 'Rocket',
        accessor: 'rocket.rocket_name',
        Filter: SelectColumnFilter,
        //Filter: FilterTopdown,
        disableFilters: true
        //Cell: ({ cell: { value } }) => <Tcolumns__Rocket values={value} />
    },
]