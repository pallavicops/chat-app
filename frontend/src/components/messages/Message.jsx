

const Message = () => {


	

	return (
		<div className={`chat chat-end`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={"https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"} />
				</div>
			</div>
			<div className={`chat-bubble text-white bg-blue-500 pb-2`}>Hi there!</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:12</div>
		</div>
	);
};
export default Message;