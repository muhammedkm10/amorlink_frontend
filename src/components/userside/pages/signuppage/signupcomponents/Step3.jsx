import React from 'react'
import RadioButton from '../../../common/Userradiobutton'
import Userdropdown from '../../../common/Userdropdown';


function Step3({data,handleChange,isMaritalstatus,isHeightvalid,isFamilystatus}) {

  const maritalStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
  ];
  
  
  const height = [
    {label :"select a groom's height range"},
    { label: "Under 5' (Under 152 cm)", value: "0-151.999" },
    { label: "5'0\" - 5'3\" (152 - 160 cm)", value: "152-160" },
    { label: "5'4\" - 5'7\" (161 - 170 cm)", value: "161-170" },
    { label: "5'8\" - 5'11\" (171 - 180 cm)", value: "171-180" },
    { label: "6'0\" - 6'3\" (181 - 190 cm)", value: "181-190" },
    { label: "6'4\" - 6'7\" (191 - 200 cm)", value: "191-200" },
    { label: "6'8\" - 6'11\" (201 - 210 cm)", value: "201-210" },
    { label: "7'0\" and above (Over 210 cm)", value: "211-Infinity" }
  ];

  const familystatus = [
    {label :"select a family status"},
    { label: 'Middle class', value: 'Middle class' },
    { label: 'Upper middle', value: 'Upper middle' },
    { label: 'High class', value: 'High class' },
    { label: 'Rich/Affluent', value: 'Rich/Affluent' },
  ];



  return (
    <div className='inputs text-center'>
          <div className='d-flex '>   
                <label htmlFor="">Marital status : </label>
                <div className="p-3 d-flex flex-wrap justify-content-center">
                  {maritalStatusOptions.map((option) => (
                    <div className="p-2 col-12 col-sm-6 col-md-3" key={option.value}>
                      <RadioButton label={option.label} name="maritalStatus" value={option.value} checked={data.maritalStatus === option.value} onChange={handleChange}  />
                    </div>
                  ))}
                </div>
          </div>
        { !isMaritalstatus && <div className="error">select an option</div> }


          <div className='d-flex '>
             <label htmlFor="">Height    :   </label>
             <div className="p-3">
              <Userdropdown  options={height} onChange={handleChange} value={data.height} name="height"/>
              </div>
          </div>
      {data.height ? <div className="text-info">Height : {data.height}</div>:""}

          { !isHeightvalid && <div className="error">select an option</div> }

          <div className='d-flex '>
             <label htmlFor="">Family status    :   </label>
             <div className="p-3">
              <Userdropdown  options={familystatus} onChange={handleChange} value={data.familystatus} name="familystatus"/>
              </div>
          </div>
      {data.familystatus ? <div className="text-info">Family status   : {data.familystatus}</div>:""}

          { !isFamilystatus && <div className="error">select an option</div> }


    </div>
  )
}

export default Step3