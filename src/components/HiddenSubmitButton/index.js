import React from 'react'

const HiddenSubmitButton = React.forwardRef((_props, ref) => (
    <input
        ref={ref}
        type='submit'
        style={{ display: 'none' }}
    />
));

export default HiddenSubmitButton
