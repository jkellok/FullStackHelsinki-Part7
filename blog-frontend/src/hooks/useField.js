import { useState } from "react"

export const useField = (props) => {
  const [value, setValue] = useState('')

  const type = props.type

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}