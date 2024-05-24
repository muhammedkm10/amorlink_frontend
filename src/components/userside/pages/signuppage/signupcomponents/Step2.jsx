import React from 'react'
import Userinput from '../../../common/Userinput'
import Userdropdown from '../../../common/Userdropdown'

function Step2({data,handleChange ,isLanguagevalid,isReligionvalid,isCastvalid,isDatevalid}) {
  
  const languages = [
    {label :"select a language"},
    {value :"malayalam",label :"malayalam"},
    { label: "Hindi", value: "Hindi" },
    { label: "Bengali", value: "Bengali" },
    { label: "Telugu", value: "Telugu" },
    { label: "Marathi", value: "Marathi" },
    { label: "Tamil", value: "Tamil" },
    { label: "Urdu", value: "Urdu" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Kannada", value: "Kannada" },
    { label: "Odia", value: "Odia" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "Others", value: "Others" },



  ]
  const religions = [ 
    {label :"select a religion"},
    { label: "Hinduism", value: "Hinduism" },
    { label: "Islam", value: "Islam" },
    { label: "Christianity", value: "Christianity" },
    { label: "Sikhism", value: "Sikhism" },
    { label: "Buddhism", value: "Buddhism" },
    { label: "Jainism", value: "Jainism" },
    { label: "Zoroastrianism", value: "Zoroastrianism" },
    { label: "Judaism", value: "Judaism" },
    { label: "Bahá'í Faith", value: "Bahá'í Faith" },
    { label: "Sarnaism", value: "Sarnaism" },
    { label: "Other Indigenous Religions", value: "Other Indigenous Religions" },
    { label: "Atheism", value: "Atheism" },
    { label: "Agnosticism", value: "Agnosticism" },
    { label: "Irreligion", value: "Irreligion" },
    { label: "Others", value: "Others" }

  ]
  const cast = [ 
    {label :"select a cast"},
    { label: "Brahmin", value: "Brahmin" },
    { label: "Kshatriya", value: "Kshatriya" },
    { label: "Vaishya", value: "Vaishya" },
    { label: "Shudra", value: "Shudra" },
    { label: "Jat", value: "Jat" },
    { label: "Yadav", value: "Yadav" },
    { label: "Gujjar", value: "Gujjar" },
    { label: "Ahir", value: "Ahir" },
    { label: "Kurmi", value: "Kurmi" },
    { label: "Rajput", value: "Rajput" },
    { label: "Bania", value: "Bania" },
    { label: "Kayastha", value: "Kayastha" },
    { label: "Maratha", value: "Maratha" },
    { label: "Patel", value: "Patel" },
    { label: "Reddy", value: "Reddy" },
    { label: "Patil", value: "Patil" },
    { label: "Gounder", value: "Gounder" },
    { label: "Naicker", value: "Naicker" },
    { label: "Chettiar", value: "Chettiar" },
    { label: "Mudaliar", value: "Mudaliar" },
    { label: "Mudaliar", value: "Mudaliar" },
    { label: "Nair", value: "Nair" },
    { label: "Menon", value: "Menon" },
    { label: "Pillai", value: "Pillai" },
    { label: "Thakur", value: "Thakur" },
    { label: "Chaudhary", value: "Chaudhary" },
    { label: "Jha", value: "Jha" },
    { label: "Goswami", value: "Goswami" },
    { label: "Rout", value: "Rout" },
    { label: "Das", value: "Das" },
    { label: "Pattanaik", value: "Pattanaik" },
    { label: "Sarkar", value: "Sarkar" },
    { label: "Mandal", value: "Mandal" },
    { label: "Barman", value: "Barman" },
    { label: "Mahato", value: "Mahato" },
    { label: "Dutta", value: "Dutta" },
    { label: "Kar", value: "Kar" },
    { label: "Ghosh", value: "Ghosh" },
    { label: "Kundu", value: "Kundu" },
    { label: "Bose", value: "Bose" },
    { label: "Mitra", value: "Mitra" },
    { label: "Pal", value: "Pal" },
    { label: "Sharma", value: "Sharma" },
    { label: "Verma", value: "Verma" },
    { label: "Singh", value: "Singh" },
    { label: "Yadav", value: "Yadav" },
    { label: "Maurya", value: "Maurya" },
    { label: "Kumar", value: "Kumar" },
    { label: "Jha", value: "Jha" },
    { label: "Bhattacharya", value: "Bhattacharya" },
    { label: "Sinha", value: "Sinha" },
    { label: "Chakraborty", value: "Chakraborty" },
    {label:'Others',vlaue:'Others'}

  ]
  return (
    <div>
    <div className="inputs text-center">
        <div className='d-flex '>
              <label htmlFor=""className='p-2'>Date of birth :</label>
              <Userinput placeholder="Date of birth" type="date"  name="dob" value={data.dob}  onChange={handleChange}/>
        </div>
        { !isDatevalid && <div className="error">Groom should be 18 years old</div> }
        <div  className='d-flex '>
              <label htmlFor=""className='p-2'>Mother toungue   :  </label>
              <Userdropdown options={languages}  name="language" value={data.language} onChange={handleChange}/>
        </div>
      {data.language ? <div className="text-info">Language : {data.language}</div>:""}

        { !isLanguagevalid && <div className="error">Select one option</div> }
        <div className='d-flex '>
              <label htmlFor=""className='p-2'>Religion   :  </label>
              <Userdropdown options={religions}  name="religion" value={data.religion} onChange={handleChange}/>
        </div>
      {data.religion ? <div className="text-info">Religion : {data.religion}</div>:""}

        { !isReligionvalid && <div className="error">Select one option</div> }
        <div className='d-flex '>
              <label htmlFor=""className='p-2'>Cast   :  </label>
              <Userdropdown options={cast}  name="cast" value={data.cast} onChange={handleChange}/>
        </div>
      {data.cast ? <div className="text-info">Cast : {data.cast}</div>:""}

        { !isCastvalid && <div className="error">Select one option</div> }
    </div>
    </div>
  )
}

export default Step2