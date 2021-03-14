const status = (status) => {
  return {
    backgroundColor: status,
    color: '#fff',
    padding: '2px 13px',
    borderRadius: '5rem',
    fontSize: '0.8rem',
    boxShadow: `0px 0px 12px ${status}`
  }
}
export default status
