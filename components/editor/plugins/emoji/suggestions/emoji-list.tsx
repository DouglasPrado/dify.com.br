/* eslint-disable react/display-name */
//@ts-nocheck

import { cn } from '@/lib/utils'
import './emoji-list.css'

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

export const EmojiList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: any) => {
    const item = props.items[index]

    if (item) {
      props.command({ name: item.name })
    }
  }

  const upHandler = () => {
    setSelectedIndex(((selectedIndex + props.items.length) - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => {
    return {
      onKeyDown: (x: any) => {
        if (x.event.key === 'ArrowUp') {
          upHandler()
          return true
        }

        if (x.event.key === 'ArrowDown') {
          downHandler()
          return true
        }

        if (x.event.key === 'Enter') {
          enterHandler()
          return true
        }

        return false
      },
    }
  }, [upHandler, downHandler, enterHandler])

  return (
    <div className="dropdown-menu bg-white border">
      {props.items.map((item: any, index: any) => (
        <button
          className={cn("", index === selectedIndex ? 'is-selected' : '')}
          key={index}
          onClick={() => selectItem(index)}
        >
          { item.fallbackImage
            ? <img src={item.fallbackImage}  />
            : item.emoji
          }
          :{item.name}:
        </button>
      ))}
    </div>
  )
})