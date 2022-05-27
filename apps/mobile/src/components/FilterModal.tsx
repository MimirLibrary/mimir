import React, {useState} from 'react'
import {ModalBottomSheet} from "./ModalBottomSheet";

export const FilterModal = ({visible,onClose}) =>{
  const [isSelected, setSelection] = useState(false);

  return(
    <ModalBottomSheet visible={visible} onClose={onClose}>
    </ModalBottomSheet>
  )
}
