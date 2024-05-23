import React,{useState,} from 'react'
import Userdropdown from '../../../common/Userdropdown'
import statesData from '../../../../../assets/states';


function Step4({data,handleChange,isAnnualincome,isEmployedin,isState,isDistrict}) {
  

  // for finding the states name and the districts under the selected state
  const [districts, setDistricts] = useState([]);

// finding the states from the data
  const states = 
    statesData.map(state => {
      return (
        {
          label:state.state,
          value:state.state
        }
      )

    })

// finding the name of the districts from the data using the state name selected by this function

    const another_function = (vlaue) =>{
      const selectedState = statesData.find(state => state.state === vlaue);
      setDistricts(selectedState.districts.map(district => {
        return (
          {
            label:district,
            value:district
          }
        )
      }))
      
      

    }
  
  
  
  const job = [
      {label :"select a proffession"},
      {label : "Government / PSU", value: "Government / PSU"},
      {label : "Private", value: "Private"},
      {label : "Business", value: "Business"},
      {label : "Defence", value: "Defence"},
      {label : "Self employed", value: "Self employed"},
      {label : "Not working", value: "Not working"},
  ]

  const salary = [
    {label :"select a salary range"},
    { label: "Under ₹50,000", value: "0-50000" },
    { label: "₹50,000 - ₹1,00,000", value: "50000-100000" },
    { label: "₹1,00,001 - ₹1,50,000", value: "100001-150000" },
    { label: "₹1,50,001 - ₹2,00,000", value: "150001-200000" },
    { label: "₹2,00,000 above",value: "₹2,00,000-"}
  ]
  
  

  console.log(data)



  return (
    <div>
    <div className="input">
          <div className="d-flex align-items-center">
            <label htmlFor="employed_in" className="mr-3">Employed in:</label>
            <div className="p-3">
              <Userdropdown options={job} name="employed_in" onChange={handleChange} value={data.employed_in} />
            </div>
          </div>
      {data.employed_in ? <div className="text-info">Profission : {data.employed_in}</div>:""}

        { !isEmployedin && <div className="error">select an option</div> }
          
          <div className="d-flex align-items-center">
            <label htmlFor="annual_income" className="mr-3">Annual income  :</label>
            <div className="p-3">
              <Userdropdown options={salary} name="annual_income" onChange={handleChange} value={data.annual_income} />
            </div>
          </div>
      {data.annual_income ? <div className="text-info">Annual income : {data.annual_income}</div>:""}

        { !isAnnualincome && <div className="error">select an option</div> }

          <div className="d-flex align-items-center">
            <label htmlFor="country" className="mr-3">Country  :</label>
            <div className="p-3">
              <input value="India" disabled></input>
            </div>
          </div>
           <div className="d-flex align-items-center">
          <label htmlFor="state" className="mr-3">State  :</label>
          <div className="p-3">
            <Userdropdown options={states} name="state" onChange={(e)=>{handleChange(e)
            another_function(e.target.value)
            }} value={data.state} />
          </div>
        </div>
      {data.state ? <div className="text-info">State : {data.state}</div>:""}

        { !isState && <div className="error">select an option</div> }
        {isState && (
          <div className="d-flex align-items-center">
            <label htmlFor="district" className="mr-3">District  :</label>
            <div className="p-3">
              <Userdropdown options={districts} name="district" value={data.district} onChange={handleChange} selectedValue={data.district} />
            </div>
          </div>
        )}
      {data.district ? <div className="text-info">District : {data.district}</div>:""}

        {!isDistrict && isState && <div className="error">Please select a district</div>}
    </div>
  </div>
  )
}



export default Step4