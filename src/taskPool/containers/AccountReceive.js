import React from 'react'
import AccountReceiveList from '../components/Account/AccountReceiveList'
import AccountForm from '../components/Account/AccountForm'
function AccountReceive() {
  return (
    <div>
      <AccountForm isReceive={true} />
      <AccountReceiveList />
    </div>
  )
}

export default AccountReceive
