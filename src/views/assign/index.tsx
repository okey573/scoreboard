import React, { useState } from 'react'
import { Button } from 'antd'

const Assign: React.FC = function () {

  const [users, setUsers] = useState([
    {
      name: '张三',
      age: 10
    }
  ])

  const onChange = async () => {
    // const newUsers = [...users]
    // users[0].name = '李四'
    setUsers((oldUser) => {
      const [first, ...other] = oldUser

      return [
        {
          name: '李四',
          age: 10
        },
        ...other
      ]
    })
  }

  return <>
    { users.map(user => <p>{ user.name }</p>) }
    <Button onClick={ () => onChange() }>change</Button>
  </>
}

export default Assign

//
