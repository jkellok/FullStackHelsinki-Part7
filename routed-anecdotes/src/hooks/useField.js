import { useState } from "react"

export const useField = (props) => {
  const [value, setValue] = useState('')
  //const [content, setContent] = useState([{value: ''}])
  const [author, setAuthor] = useState([{value: ''}])

  const type = props.type

  console.log("props", props)
  //console.log("type in usefield", type, "value", value, "name", name)

  const onClick = (content) => {
    console.log("onclick")
    console.log("reset")
    //setContent('')
    setValue('')
    console.log("props", props)
    return content.value = ''
  }

  console.log("value", value)

  const onChange = (event) => {
    console.log("onchange event", event)
    setValue(event.target.value)
  }

  //console.log("content", content)

  if (type === 'button') { return { type, onClick } }
  return {
    type,
    value,
    onChange
  }
}