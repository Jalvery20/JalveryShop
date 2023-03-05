import React from 'react'
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"

const ProtectedRoute = ({isAdmin,children}) => {
  const {isAuthenticated, loading,user }=useSelector(state=>state.auth)

  if(loading===false){
    if(isAdmin===true && user.role!== "admin") return <Navigate to="/" replace />
    if(isAuthenticated===false){
      return <Navigate to="/login" replace />
    }
    return children;
  }    
}

export default ProtectedRoute