// Component that renders error message.
// props:
//   message: error message that has to be displayed
const Error = ({ message }) => (
  message ? <div className="error">{ JSON.stringify(message) }</div> : null
);


export default Error;