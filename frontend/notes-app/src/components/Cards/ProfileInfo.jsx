/* eslint-disable react/prop-types */

import { getInitials } from "../../utils/helper"


const ProfileInfo = ({onLogOut,name}) => {
  return (
    <div className="flex  items-center gap-3">
      <div className="w-12 h-12 flex justify-center items-center rounded-full text-black font-medium bg-slate-200">{getInitials(name)}</div>

      <div>
        <p className="text-sm font-medium">{name}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogOut}>Logout</button>
      </div>
    </div>
  )
}

export default ProfileInfo
