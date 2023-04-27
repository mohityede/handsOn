import Button from "./Button";

// Card component renders each record in "data.records" from the api
// consists of table, thead, tbody elements along with tr, th, td
// props:
//   deleteHandler: a function that deletes the record
//   _id: _id from the api 
//   index: each row index 
//   count: count from the api
//   venue: venue key from the api
//   team1: team1 key from the api
//   team2: team2 key from the api
//   date: date key from the api. Make sure to render it in format "Day Mon DD YYYY" ex: "Sun Jun 23 2021"

const Card = ({
  // _id,
  // index,
  // count,
  // venue,
  // team1,
  // team2,
  // date,
  data
}) => (
  <div className="card" id={ data._id }>
    {/* { console.log(data) } */ }
    <div className="card-header">
      <span>
        <span className="small-txt">Match </span>
        { data.index }
        <span className="small-txt"> of </span>
        { data.count }
      </span>
      <span>
        <span className="small-txt">Venue: </span>
        { data.venue }
      </span>
    </div>
    <span id="teams">
      { data.team1 }
      <span className="small-txt"> vs </span>
      { data.team2 }
    </span>
    <div className="card-footer">
      <span id="matchDate" className="small-txt">
        {/* Render the date here in format "Day Mon DD YYYY" (ex: "Sun Jun 23 2021") */ }
        { new Date(data.date).toDateString() }
      </span>
    </div>
  </div>
);

export default Card;