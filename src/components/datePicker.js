import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const DatePicker = ({value, onChange, label}) => {
  return (
    <Fragment >
      <Label for="date-time-picker">{label}</Label>
      <Flatpickr
        value={value}
        id="default-picker"
        className="form-control"
        onChange={onChange}
      />
    </Fragment>
  );
}

export default DatePicker
