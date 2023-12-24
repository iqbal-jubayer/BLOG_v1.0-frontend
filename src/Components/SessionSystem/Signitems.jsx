import React from 'react'

const Signitems = (props) => {
	return (
		<>
			<div className='sign-items'>
				<div className="sign-input">
					<input className='base-input'
						type={props.type}
						placeholder={props.placeholder}
						autoComplete='off'
						onChange={props.HandleChange}
						value={props.value}
						name={props.name}
						minLength={props.minLength}
						required />
					{props.isUsrnameUsed ? <p>username already used</p> : ""}
				</div>
			</div>
		</>
	)
}

export default Signitems
