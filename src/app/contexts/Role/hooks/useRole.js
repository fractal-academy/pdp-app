import { useContext } from 'react'
import roleContext from '../context'

/**
 * @info useRole (08 Mar 2021) // CREATION DATE
 *
 * @comment useRole - React hook using to get current selected role from context.
 *
 * @since 08 Mar 2021 ( v.0.0.1 ) // LAST-EDIT DATE
 *
 * @returns {{
        accessRoles: array,
        role: string,
        setRole: function
      }}
 */

const useRole = () => useContext(roleContext)

export default useRole
